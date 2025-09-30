// route.js

import type { IncomingMessage, ServerResponse } from "http";
import {
  filterUsers,
  HttpMethod,
  Role,
  toggleUserState,
  type User,
} from "../models";
import { etagFor, parseBody } from "../utils";
import { authorizedRole, type AuthenticatedRequest } from "../middleware";

// TODO: Importa Router desde 'express'
// TODO: Importa USERS desde './data.js'
// TODO: Importa z desde 'zod'
// TODO: Importa etagFor desde './utils/cache.js' (o la ruta correspondiente)

// TODO: Crea y exporta el router de Express
// export const router = Router();

/**
 * GET /api/users?search=&page=1&limit=20
 * Requisitos:
 * - Leer query params: search (string), page (number), limit (number)
 * - Aplicar filtro por nombre/email/ciudad usando 'search' (case-insensitive)
 * - Paginación con 'page' y 'limit' (limit máx 100)
 * - Construir payload: { page, limit, total, items }
 * - Generar ETag débil con etagFor(payload)
 *   - Si 'If-None-Match' coincide con el ETag → responder 304 sin cuerpo
 *   - Si no coincide → poner 'ETag' en headers y responder 200 con payload
 */
// router.get('/users', (req, res) => {
//   // TODO: implementar
// });

/**
 * PATCH /api/users/:id
 * Requisitos:
 * - Buscar usuario por id (numérico); si no existe → 404
 * - Alternar (toggle) el campo booleano 'active'
 * - Responder 200 con el usuario actualizado
 */
// router.patch('/users/:id', (req, res) => {
//   // TODO: implementar
// });

export const userRoute = async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  /**
   * Handles `GET /api/users` requests.
   *
   * Workflow:
   * 1. Parses query parameters from the URL:
   *    - `search` (string): case-insensitive filter applied to `name`, `email`, and `city`.
   *    - `page` (number): page number, defaults to 1 (minimum 1).
   *    - `limit` (number): number of items per page, defaults to 20 (maximum 100).
   *
   * 2. Applies filtering and pagination:
   *    - Filters users using `filterUsers(search)`.
   *    - Computes `total` results.
   *    - Slices the filtered array based on `page` and `limit`.
   *
   * 3. Builds the response payload:
   *    ```json
   *    {
   *      "page": number,
   *      "limit": number,
   *      "total": number,
   *      "items": PublicUser[]
   *    }
   *    ```
   *
   * 4. Generates an `ETag` using `etagFor(payload)`:
   *    - If the `If-None-Match` request header matches the generated ETag,
   *      responds with `304 Not Modified` (no body).
   *    - Otherwise, sets the `ETag` response header and returns the payload.
   *
   * Possible Responses:
   * - `200 OK`: Returns the paginated and filtered users.
   * - `304 Not Modified`: When client cache matches current data (ETag).
   *
   * @param req Incoming HTTP request object.
   * @param res Outgoing HTTP response object.
   * @returns void (sends HTTP response directly).
   */
  if (url?.startsWith("/api/users") && method === HttpMethod.GET) {
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const search = parsedUrl.searchParams.get("search")?.toLowerCase() ?? "";
    const page = Math.max(
      1,
      parseInt(parsedUrl.searchParams.get("page") || "1")
    );
    const limit = Math.min(
      100,
      parseInt(parsedUrl.searchParams.get("limit") || "20")
    );

    let filteredUsers = filterUsers(search);

    const total = filteredUsers.length;
    const start = (page - 1) * limit;
    const items = filteredUsers.slice(start, start + limit);

    const payload = { page, limit, total, items };

    const etag = etagFor(payload);
    const ifNoneMatch = req.headers["if-none-match"];

    if (ifNoneMatch && ifNoneMatch === etag) {
      res.statusCode = 304;
      res.end();
      return;
    }

    res.setHeader("ETag", etag);
    res.statusCode = 200;
    res.end(JSON.stringify(payload));
    return;
  }

  /**
   * Handles `PATCH /api/users/:id` requests.
   *
   * Workflow:
   * 1. Extracts the numeric user ID from the request URL.
   * 2. Calls `toggleUserState(id)` to flip the `active` field of the user.
   * 3. Returns the updated user if found, or `404 Not Found` if the user does not exist.
   *
   * Response Format:
   * - `200 OK`:
   *   ```json
   *   {
   *     "message": "User updated successfully",
   *     "user": PublicUser
   *   }
   *   ```
   * - `404 Not Found`:
   *   ```json
   *   { "error": "User not found" }
   *   ```
   *
   * @param req Incoming HTTP request object.
   * @param res Outgoing HTTP response object.
   * @returns void (sends HTTP response directly).
   */
  if (url?.startsWith("/api/users") && method === HttpMethod.PATCH) {
    const id = parseInt(url.split("/").pop() as string, 10);

    const updatedUser = toggleUserState(id);

    if (!updatedUser) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "User updated successfully",
        user: updatedUser,
      })
    );
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Not Found" }));
};

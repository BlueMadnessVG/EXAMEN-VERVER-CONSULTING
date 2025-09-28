// route.js

import type { IncomingMessage, ServerResponse } from "http";
import {
  filterUsers,
  HttpMethod,
  Role,
  updateUser,
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

    res.setHeader("ETarg", etag);
    res.statusCode = 200;
    res.end(JSON.stringify(payload));
    return;
  }

  if (url?.startsWith("/api/users") && method === HttpMethod.PATCH) {
/*     console.log(!(await authorizedRole(Role.ADMIN) (req as AuthenticatedRequest, res)));
    if (!(await authorizedRole(Role.ADMIN) (req as AuthenticatedRequest, res))) {
      res.statusCode = 403;
      res.end(JSON.stringify({ error: "Forbidden" }));
      return;
    } */

    const id = parseInt(url.split("/").pop() as string, 10);
    const body = await parseBody(req);
    const user: User = body;
    const updatedUser = updateUser(id, user);

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

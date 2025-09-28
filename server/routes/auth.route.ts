import type { IncomingMessage, ServerResponse } from "http";
import {
  HttpMethod,
  addRevokedToken,
  authSchema,
  createUser,
  findUserByEmail,
  revokeUserToken,
  validatePassword,
} from "../models";
import { message, safeParse } from "valibot";
import { parseBody } from "../utils/";
import { sign } from "jsonwebtoken";
import { config } from "../config";
import type { AuthenticatedRequest } from "../middleware";
import { error } from "console";

/**
 * Handles authentication-related HTTP requests for registration, login, and logout.
 *
 * Supported routes:
 * - POST /auth/register: Registers a new user. Expects a request body matching `authSchema`.
 *   Returns 201 with the created user on success, or 400 on validation error.
 * - POST /auth/login: Authenticates a user. Expects a request body matching `authSchema`.
 *   Returns access and refresh tokens on success, or 401 on authentication failure.
 * - POST /auth/logout: Logs out the user by revoking their token.
 *   Returns a success message or 403 if token revocation fails.
 *
 * All other routes return 404 Not Found.
 *
 * @param {AuthenticatedRequest} req - The incoming HTTP request.
 * @param {ServerResponse} res - The server response object.
 * @returns A promise that resolves when the response is sent.
 */
export const authRoute = async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  /**
   * Handles user registration (POST /auth/register).
   *
   * Workflow:
   * 1. Parse and validate the request body against `authSchema`.
   *    - If validation fails → respond with 400 Bad Request and error details.
   * 2. Check if the email already exists (case-insensitive).
   *    - If it exists → respond with 409 Conflict and an error message.
   * 3. Create a new user:
   *    - Auto-increment `id` based on the highest current ID.
   *    - Hash the provided password using bcrypt.
   *    - Default `role` is `Role.USER`.
   *    - `active` is taken from the request (but can be overridden to `true` if required).
   * 4. Respond with 201 Created and return the newly created user.
   *
   * Possible Responses:
   * - 201 Created: {User} JSON object of the created user.
   * - 400 Bad Request: { message: string } when body validation fails or custom error is thrown.
   * - 409 Conflict: { message: "Email already exists" } if the email is already registered.
   * - 500 Internal Server Error: { message: "Internal server error" } for unexpected errors.
   *
   * @param req Incoming HTTP request (must contain JSON body with {name, email, city, active, password})
   * @param res Outgoing HTTP response
   * @returns void (sends HTTP response)
   */
  if (url === "/api/auth/register" && method === HttpMethod.POST) {
    const body = await parseBody(req);
    const result = safeParse(authSchema, body);

    if (result.issues) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: "Bad request", error: result.issues }));
      return;
    }

    const { name, email, city, active, password } = body;

    try {
      const user = await createUser(name, email, city, active, password);

      res.statusCode = 201;
      res.end(JSON.stringify(user));
      return;
    } catch (err: any) {
      if (err instanceof Error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: "Bad request",error: err.message }));
      } else {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: "Internal server error" }));
      }
      return;
    }
  }

  if (url === "/api/auth/login" && method === HttpMethod.POST) {
    const body = await parseBody(req);
    const result = safeParse(authSchema, body);

    if (result.issues) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({ message: "Bad Request", issues: result.issues })
      );
      return;
    }

    const { email, password } = body;
    const user = findUserByEmail(email);

    if (!user || !(await validatePassword(user, password))) {
      res.statusCode = 401;
      res.end(JSON.stringify({ message: "Unauthorized" }));
      return;
    }

    const accessToken = sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    const refreshToken = sign({ id: user.id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    user.refreshToken = refreshToken;

    res.end(JSON.stringify({ accessToken, refreshToken }));
    return;
  }

  if (url === "/api/auth/logout" && method === HttpMethod.POST) {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (token) {
      addRevokedToken(token);
      const formattedReq = req as AuthenticatedRequest;
      if (
        formattedReq.user &&
        typeof formattedReq.user === "object" &&
        "id" in formattedReq.user
      ) {
        const result = revokeUserToken(formattedReq.user.email);
        if (!result) {
          res.statusCode = 403;
          res.end(JSON.stringify({ message: "Forbidden" }));
        }
      }

      res.end(JSON.stringify({ message: "Logged out successfully" }));
      return;
    }
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Not Found" }));
};

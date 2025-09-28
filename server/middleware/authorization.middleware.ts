import type { ServerResponse } from "http";
import type { AuthenticatedRequest } from "./authentification.middleware";
import type { User } from "../models";

export const authorizedRole = (...roles: string[]): Function => {
  return async (
    req: AuthenticatedRequest,
    res: ServerResponse
  ): Promise<boolean> => {
    const userRole = (req.user as User).role;

    if (!userRole || !roles.includes(userRole)) {
      res.statusCode = 403;
      res.end(JSON.stringify({ message: "Forbidden" }));
      return false;
    }

    return true;
  };
};

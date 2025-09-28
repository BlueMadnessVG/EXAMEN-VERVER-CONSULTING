import type { IncomingMessage, ServerResponse } from "http";
import { type JwtPayload, verify } from "jsonwebtoken";
import { isTokenRevoked } from "../models";
import {config} from "../config";

/**
 * Interface for the authenticated request.
 * @interface
 * @extends {IncomingMessage}.
 */
export interface AuthenticatedRequest extends IncomingMessage { 
    user?: JwtPayload | string;
}

/**
 * Middleware function to authenticate a JWT token from the request's Authorization header.
 * @param {AuthenticatedRequest} req - The incoming request object, expected to have an Authorization header.
 * @param {ServerResponse} res - The server response object.
 * @returns {Promise<boolean>} A promise that resolves to true if authentication succeeds, or false otherwise.
 */
export const authenticatedToken = async (
    req: AuthenticatedRequest,
    res: ServerResponse,
): Promise<boolean> => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) { 
        res.statusCode = 401;
        res.end(JSON.stringify({ message: 'Unauthorized' }));
        
        return false;
    }

    if (isTokenRevoked(token)) { 
        res.statusCode = 403;
        res.end(JSON.stringify({ message: 'Forbidden' }));
        
        return false;
    }

    try {
        const decoded = verify(token, config.jwtSecret);

        req.user = decoded;
        return true;
    } catch (_err) {
        res.statusCode = 403;
        res.end(JSON.stringify({ message: 'Forbidden' }));

        return false;
    }
}

const revokedTokens: Set<string> = new Set();

/**
 * Adds a token to the revoked tokens set.
 * @param {string} token - The token string to revoke.
 * @returns {void}
 */
export const addRevokedToken = (token: string): void => {
    revokedTokens.add(token);
}

/**
 * Checks if a given token has been revoked.
 * @param {string} token - The token string to check for revocation.
 * @returns {boolean} True if the token is revoked, otherwise false.
 */
export const isTokenRevoked = (token: string): boolean => { 
    return revokedTokens.has(token);
}
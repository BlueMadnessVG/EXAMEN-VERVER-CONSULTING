import type { IncomingMessage } from "http";
import { StringDecoder } from "string_decoder";
import crypto from "crypto";

/**
 * Parses the body of an incoming HTTP request and returns it as a JavaScript object.
 * @param {IncomingMessage} req - The incoming HTTP request to parse.
 * @returns {Promise<any>} A promise that resolves with the parsed JSON object, or rejects if parsing fails.
 */
export const parseBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    const decoder = new StringDecoder("utf-8");
    let buffer = "";

    req.on("data", (chunk) => {
      buffer += decoder.write(chunk);
    });

    req.on("end", () => {
      buffer += decoder.end();

      try {
        resolve(JSON.parse(buffer));
      } catch (error) {
        reject(error);
      }
    });
  });
};

/**
 * Generates a weak ETag for the given object.
 *
 * Steps:
 * - Stringify the object with JSON.stringify
 * - Hash it using SHA1
 * - Return it as a weak ETag string: W/"<hash>"
 *
 * @param {object} obj - The object to hash
 * @returns {string} Weak ETag value
 */
export const etagFor = (obj: unknown): string => {
  const json = JSON.stringify(obj);
  const hash = crypto.createHash("sha1").update(json).digest("hex");
  return `W/${hash}`;
};

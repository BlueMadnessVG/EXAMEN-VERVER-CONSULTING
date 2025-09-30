import axios from "axios";

/**
 * Creates an Axios instance with pre-configured settings for API communication.
 *
 * Configuration includes:
 * - baseURL: Uses the VITE_API_URL environment variable if available,
 *   otherwise defaults to "http://localhost:4000"
 * - headers: Sets Content-Type to "application/json" for all requests
 *
 * This instance can be used throughout the application to make HTTP requests
 * to the configured API endpoint with consistent settings.
 *
 * @constant {Object} apiEndpoint
 * @property {string} baseURL - The base URL for all API requests
 * @property {Object} headers - Default headers for all requests
 * @property {string} headers.Content-Type - Set to "application/json"
 */
export const apiEndpoint = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

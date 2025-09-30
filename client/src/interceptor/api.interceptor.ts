import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getValidationError, SnackbarUtilities } from "../utils";
import { apiEndpoint } from "../services/apiEndpoints";

export const AxiosInterceptor = () => {
  const updateHeaders = (request: InternalAxiosRequestConfig) => {
    //const token = getLocalStorage("token");
    /* If a token exists in localStorage, add it to the Authorization header */
    return request;
  };

  apiEndpoint.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      console.log("Request Interceptor called", request);
      return updateHeaders(request);
    },
    (error) => {
      console.error("Request Interceptor error", error);
      return Promise.reject(error);
    }
  );

  apiEndpoint.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log("Response Interceptor called", response);
      return response;
    },
    (error) => {
      console.error("Response Interceptor error", error);

      if (error.code === "ERR_CANCELED") {
        console.log("Request was cancelled", error);
        return Promise.reject(error);
      }

      SnackbarUtilities.error(getValidationError(error.code));
      return Promise.reject(error);
    }
  );
};

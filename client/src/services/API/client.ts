// client.js

import type { PaginatedUserResponse, User, UserFormData } from "../../schemas";
import { apiEndpoint } from "../apiEndpoints";

// Constante base de la API
// TODO: Define la URL base de la API (http://localhost:4000/api)

// TODO: Crea una función para obtener usuarios (fetchUsers)
// - Debe aceptar parámetros: search, page, limit
// - Construir la URL con query params
// - Hacer fetch a /users
// - Manejar errores y retornar la respuesta en JSON

// TODO: Crea una función para crear un nuevo usuario (createUser)
// - Debe hacer un POST a /users
// - Enviar el payload como JSON
// - Manejar errores y retornar la respuesta en JSON

// TODO: Crea una función para alternar el estado activo/inactivo de un usuario (toggleUser)
// - Debe hacer un PATCH a /users/:id
// - Manejar errores y retornar la respuesta en JSON

export interface getUsersParam {
  page?: number;
  limit?: number;
  search?: string;
}

export const getUsers = async (
  params: getUsersParam = {}
): Promise<PaginatedUserResponse> => {
  const { page = 1, limit = 10, search } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) queryParams.append("search", search);

  const response = await apiEndpoint.get(`/users?${queryParams}`);
  return response.data;
};

export const createUser = async (userData: UserFormData): Promise<User> => {
  const response = await apiEndpoint.post("/auth/register", userData);
  return response.data;
};

export const toggleUserStatus = async (userId: string): Promise<User> => {
  const response = await apiEndpoint.patch<{
    message: string;
    user: User;
  }>(`/users/${userId}`);
  return response.data.user;
};

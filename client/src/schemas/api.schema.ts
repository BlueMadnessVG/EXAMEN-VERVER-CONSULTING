import * as v from "valibot";

export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  total: number;
  items: T[];
}

export const PaginatedUserResponseSchema = v.object({
  page: v.number(),
  limit: v.number(),
  total: v.number(),
  items: v.array(
    v.object({
      id: v.string(),
      name: v.string(),
      email: v.string(),
      city: v.string(),
      active: v.boolean(),
      role: v.string(),
    })
  ),
});

export type PaginatedUserResponse = v.InferOutput<typeof PaginatedUserResponseSchema>;

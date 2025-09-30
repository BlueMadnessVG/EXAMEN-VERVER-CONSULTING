import * as v from "valibot";

export const UserSchema = v.object({
  name: v.pipe(
    v.string("Name must be a string"),
    v.trim(),
    v.nonEmpty("Name is required"),
    v.minLength(2, "Name must be at least 2 characters")
  ),
  email: v.pipe(
    v.string("Email must be a string"),
    v.trim(),
    v.nonEmpty("Email is required"),
    v.email("Please enter a valid email address")
  ),
  city: v.pipe(
    v.string("City must be a string"),
    v.trim(),
    v.minLength(2, "City must be at least 2 characters")
  ),
});

export type UserFormData = v.InferOutput<typeof UserSchema>;

export interface User { 
  id: string;
  name: string;
  email: string;
  city: string;
  active: boolean;
}
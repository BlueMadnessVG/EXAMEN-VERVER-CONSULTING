import { compare, hash } from "bcrypt";
import {
  boolean,
  email,
  minLength,
  object,
  pipe,
  string,
  type InferInput,
} from "valibot";

// data.js

// TODO: Define un arreglo USERS con datos en memoria para pruebas
// - Debe tener 120 usuarios generados automáticamente
// - Cada usuario debe incluir:
//   - id (numérico incremental)
//   - name (ejemplo: "User 1")
//   - email (algunos terminados en .org, otros en .com)
//   - city (ejemplo: "Monterrey", "CDMX", "Guadalajara", "León")
//   - active (booleano, alternando entre true/false)

/**
 * Esquema de validación para crear usuario
 * Requisitos:
 * - name: string con mínimo 2 chars
 * - email: email válido
 * - city: string con mínimo 2 chars
 */
// const CreateUser = z.object({
//   // TODO: implementar
// });

const nameSchema = pipe(string(), minLength(2));
const emailSchema = pipe(string(), email());
const citySchema = pipe(string(), minLength(2));
const activeSchema = pipe(boolean());

export const userSchema = object({
  name: nameSchema,
  email: emailSchema,
  city: citySchema,
  active: activeSchema,
});

export const authSchema = object({
  email: emailSchema,
});

export enum Role {
  "ADMIN" = "admin",
  "USER" = "user",
}

export type User = InferInput<typeof userSchema> & {
  id: number;
  role: Role;
  refreshToken?: string;
};
export type PublicUser = Omit<User, "password">;

const users: Map<string, User> = new Map();
let currentId = 0;

export const toPublicUser = (user: User): PublicUser => {
  const { ...rest } = user;
  return rest;
};

/**
 * Create a new user with the given email and password.
 * the password is hashed before storing
 *
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} city - The name of the user city
 * @param {boolean} active - The state of the user
 * @param {string} password - The password of the user
 * @return {Promise<User>} - The created user
 */

export const createUser = async (
  name: string,
  email: string,
  city: string,
): Promise<PublicUser> => {
  if (users.has(email)) {
    throw new Error("EMAIL_EXIST");
  }

  const hashedPassword = await hash("password123", 10);
  const newUser: User = {
    id: currentId++,
    name,
    email,
    city,
    active: true,
    role: Role.USER,
  };

  users.set(email, newUser);
  return toPublicUser(newUser);
};

/**
 * Returns an array of all users.
 * @returns {PublicUser[]} Array of all users.
 */
export const getAllUsers = (): PublicUser[] => {
  return Array.from(users.values()).map(toPublicUser);
};

/**
 *Finds a user by their given email.
 *
 *@param {string} email - The email of the user to find
 *@returns {PublicUser | undefined} - The user if found, otherwise undefined.
 */
export const findUserByEmail = (email: string): User | undefined => {
  return users.get(email);
};

/**
 *Finds a user by their given id.
 *
 *@param {number} id - The id of the user to find
 *@returns {User | undefined} - The user if found, otherwise undefined.
 */
export const findUserById = (id: number): User | undefined => {
  return Array.from(users.values()).find((u) => u.id === id);
};

/**
 * Filters users by a search term across name, email, and city.
 *
 * @param {string} search - The search string (case-insensitive). If empty, returns all users.
 * @returns {User[]} - Array of matching users.
 */
export const filterUsers = (search: string): PublicUser[] => {
  const term = search.trim().toLowerCase();

  if (!term) {
    return Array.from(users.values());
  }

  return Array.from(users.values())
    .filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.city.toLowerCase().includes(term)
    )
    .map(toPublicUser);
};

/**
 * Toggles the `active` state of a user by ID.
 *
 * - Finds the user with the given `id`.
 * - If found, flips the boolean value of `active`.
 * - Updates the user in the in-memory store (`users` map).
 * - Returns the updated user in its public representation.
 * - If no user is found, logs an error and returns `null`.
 *
 * @param id The numeric ID of the user to toggle.
 * @returns {PublicUser | null} The updated public user if found, otherwise `null`.
 */
export const toggleUserState = (id: number): PublicUser | null => {
  const user = Array.from(users.values()).find((u) => u.id === id);

  if (!user) {
    console.error("User with id", id, "not found");
    return null;
  }

  const updatedUser = { ...user, active: !user.active };

  users.set(updatedUser.email, updatedUser);
  return toPublicUser(updatedUser);
};

/**
 * Validates a plain-text password against a stored hashed password.
 *
 * Workflow:
 * - Uses bcrypt `compare` to check whether the provided plain-text `password`
 *   matches the user's hashed password stored in the model.
 * - Returns `true` if the password is valid, otherwise `false`.
 *
 * @param {User} user - The user object containing the hashed password.
 * @param {string} password - The plain-text password to validate.
 * @returns {Promise<boolean>} Resolves to `true` if the password matches, `false` otherwise.
 */
/* export const validatePassword = async (
  user: User,
  password: string
): Promise<boolean> => {
  return compare(password, user.password);
}; */

/**
 * Revoke Token
 *
 * @param {string} email - The email of the user to revoke the token
 * @returns {boolean} True if the token is revoked, otherwise false
 */
export const revokeUserToken = (email: string): boolean => {
  const foundUser = users.get(email);

  if (!foundUser) return false;

  users.set(email, { ...foundUser, refreshToken: undefined });
  return true;
};

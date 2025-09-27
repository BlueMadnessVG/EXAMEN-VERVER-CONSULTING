// route.js

// TODO: Importa Router desde 'express'
// TODO: Importa USERS desde './data.js'
// TODO: Importa z desde 'zod'
// TODO: Importa etagFor desde './utils/cache.js' (o la ruta correspondiente)

// TODO: Crea y exporta el router de Express
// export const router = Router();

/**
 * GET /api/users?search=&page=1&limit=20
 * Requisitos:
 * - Leer query params: search (string), page (number), limit (number)
 * - Aplicar filtro por nombre/email/ciudad usando 'search' (case-insensitive)
 * - Paginación con 'page' y 'limit' (limit máx 100)
 * - Construir payload: { page, limit, total, items }
 * - Generar ETag débil con etagFor(payload)
 *   - Si 'If-None-Match' coincide con el ETag → responder 304 sin cuerpo
 *   - Si no coincide → poner 'ETag' en headers y responder 200 con payload
 */
// router.get('/users', (req, res) => {
//   // TODO: implementar
// });

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

/**
 * POST /api/users
 * Requisitos:
 * - Validar body con CreateUser; si falla → 400 con detalle del error
 * - Verificar que el email no exista (case-insensitive); si existe → 409
 * - Generar id incremental (máx actual + 1)
 * - Crear usuario con 'active: true' y devolver 201 con el usuario creado
 */
// router.post('/users', (req, res) => {
//   // TODO: implementar
// });

/**
 * PATCH /api/users/:id
 * Requisitos:
 * - Buscar usuario por id (numérico); si no existe → 404
 * - Alternar (toggle) el campo booleano 'active'
 * - Responder 200 con el usuario actualizado
 */
// router.patch('/users/:id', (req, res) => {
//   // TODO: implementar
// });

# Velver Skill-Check (React + Node)

## Requisitos
- Node 18+
- Dos terminales (server y client)

## Cómo correr

### Server
```bash
cd server
npm i
npm run dev
Client
bash
Copy code
cd client
npm i
npm run dev
API: http://localhost:4000

Web: http://localhost:5173

Endpoints objetivo (a implementar/validar)
GET /api/users?search=&page=&limit= → lista paginada de usuarios (total y items)

POST /api/users → crear usuario { name, email, city }

PATCH /api/users/:id → alternar estado active

Qué viene “en blanco”
Cliente
src/api/client.js → funciones fetch/create/toggle con TODOs

src/components/UserForm.jsx → formulario con TODOs

src/components/UsersTable.jsx → tabla con TODOs

src/hooks/useDebouncedValue.js → hook con TODOs

src/App.jsx / src/main.jsx → integración React Query y UI con TODOs

src/styles.css → estilos con TODOs

Servidor
server/index.js → bootstrap con TODOs

server/routes.js → rutas y lógica con TODOs

server/data.js → fuente de datos en memoria (definir USERS)

server/utils/cache.js → helper para ETag con TODOs

Tareas para el candidato
CLIENT-01: Implementar useQuery con debounce en búsqueda y evitar refetch loops.

CLIENT-02: Optimizar tabla con useMemo/useCallback.

CLIENT-03: Completar UserForm y client.js (create/fetch/toggle).

SERVER-01: Implementar paginación real en GET /api/users y exponer total.

SERVER-02: Validación robusta en POST /api/users (zod) y evitar emails duplicados (409).

SERVER-03: Implementar toggle booleano en PATCH /api/users/:id.

SERVER-04 (bonus): ETag/304 en GET /api/users.

Criterios de evaluación (100 pts)
Arranque y funcionamiento (10)

Front: React Query + optimizaciones (25)

Back: paginación + validación + toggle (40)

Calidad de código y README (20)

Bonus: ETag/304 (5)

Objetivo
Demostrar dominio de:

Node.js + Express → rutas, validaciones, paginación, cache condicional

React + React Query → datos async, hooks de optimización, estados de carga/errores

Integración cliente-servidor y buenas prácticas

Notas
No se requiere DB: la data es en memoria.

Mantén el código claro, pequeño y probado (happy path + errores).

Documenta decisiones relevantes en este README.
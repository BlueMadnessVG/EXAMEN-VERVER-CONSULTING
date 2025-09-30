// App.jsx

// TODO: Importa React y los hooks necesarios (useState, useMemo, useEffect)
// TODO: Importa useQuery y useQueryClient desde '@tanstack/react-query'
// TODO: Importa las funciones de API (fetchUsers, createUser, toggleUser)
// TODO: Importa los componentes UsersTable y UserForm
// TODO: Importa el hook useDebouncedValue

// TODO: Crea el componente App

// TODO: Estado local:
// - search (string)
// - page (number)
// - limit (const = 20)

// TODO: Aplica useDebouncedValue a 'search' con delay 300ms

// TODO: Configura useQuery para obtener usuarios
// - queryKey: ['users', { search: debounced, page, limit }]
// - queryFn: fetchUsers({ search: debounced, page, limit })
// - staleTime: 5000
// - Debe exponer: data, isLoading, error

// TODO: Deriva:
// - items = data?.items || []
// - total = data?.total || 0
// - totalPages = useMemo(() => Math.max(Math.ceil(total / limit), 1), [total, limit])

// TODO: onCreate(payload):
// - Llamar a createUser(payload)
// - Invalidate query ['users'] con useQueryClient

// TODO: onToggle(id):
// - Llamar a toggleUser(id)
// - Invalidate query ['users']

// TODO: useEffect:
// - Cuando cambie 'debounced', resetear page a 1

// TODO: useMemo para 'stats':
// - orgCount = cantidad de usuarios con email que termina en '.org'

// TODO: Render:
// - Contenedor principal con título "Velver Skill-Check"
// - Toolbar con input controlado para 'search' y un span que muestre ".org: {orgCount}"
// - Si 'error': mostrar mensaje de error
// - Si 'isLoading': mostrar "Cargando..."
// - Si no:
//   - <UsersTable items={items} onToggle={onToggle} />
//   - Paginación:
//     - Botón 'Prev' deshabilitado si page <= 1, que decrementa page
//     - Texto "Página {page} / {totalPages}"
//     - Botón 'Next' deshabilitado si page >= totalPages, que incrementa page
//   - Título "Nuevo usuario"
//   - <UserForm onCreate={onCreate} />
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { AppRoutes } from "./router";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;

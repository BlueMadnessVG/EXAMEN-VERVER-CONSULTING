// UsersTable.jsx
import style from "./css/UserTable.module.css";
import type { ReactNode } from "react";
import { UserCard } from "./UserCard/UserCard";
import type { User } from "../../schemas";

// TODO: Importa React y los hooks necesarios (useMemo, useCallback)

// TODO: Crea un componente UsersTable que reciba props:
// - items (lista de usuarios)
// - onToggle (función para alternar estado activo/inactivo)

// TODO: Memoriza la lista de filas con useMemo
// - Evita renders innecesarios

// TODO: Define una función handleToggle con useCallback
// - Debe llamar a onToggle con el id del usuario

// TODO: Renderiza una tabla con las siguientes columnas:
// - ID
// - Nombre
// - Email
// - Ciudad
// - Activo (mostrar "Sí" o "No")
// - Acciones (botón para alternar el estado del usuario)

interface UserTableProps {
  children?: ReactNode;
  users?: User[] | null;
  isLoading?: boolean;
  error?: string | null;
  onToggleStatus: (userId: string) => void;
  toggleLoading?: boolean;
}

export const UserTable = ({
  children,
  users,
  isLoading,
  error = null,
  onToggleStatus,
  toggleLoading
}: UserTableProps) => {
  if (isLoading && !users) {
    return (
      <div className={style.userTable__Container}>
        <div className={style.userTable__Loading}>Loading users...</div>
      </div>
    );
  }

  if (error && !users) {
    return (
      <div className={style.userTable__Container}>
        <div className={style.userTable__Error}>
          <p>Error loading users: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={style.userTable__Container}>
      <div className={style.userTable__Content}>
        
        {users?.map((user) => (
          <UserCard key={user.id} user={user} onToggle={ onToggleStatus } isToggleLoading= {toggleLoading} />
        ))}

        {children}
      </div>
    </div>
  );
};

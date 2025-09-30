import style from "./css/Home.module.css";
import { useState } from "react";
import { SearchBar } from "../../../components/Search/SearchBar";
import { ButtonAddUser } from "../../../components/Table/ButtonAddUser/ButtonAddUser";
import { useModalContext } from "../../../context";
import { UserForm } from "../../../components/Forms";
import { UserTable } from "../../../components/Table";
import type { UserFormData } from "../../../schemas";
import { useCreateUser } from "../../../hooks/useCreateUser";
import { useGetUsers } from "../../../hooks/useGetUsers";
import { useDebouncedValue } from "../../../hooks";
import { useToggleUserStatus } from "../../../hooks/useToggleUserStatus";
import { UserStatistics } from "../../../components/User/UserStatistics";

export const Home = () => {
  const [query, setQuery] = useState("");
  const { state, setState } = useModalContext();

  const {
    users,
    isLoading: userLoading,
    error: userError,
    pagination,
    nextPage,
    prevPage,
    setSearchQuery,
    fetchUsers: refetchUsers,
  } = useGetUsers({
    autoFetch: true,
    limit: 14,
    onSuccess: (users) => {
      console.log("User created successfully:", users);
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
    },
  });

  const {
    createUser,
    isLoading: createLoading,
    error: createError,
    resetError,
  } = useCreateUser({
    onSuccess: (user) => {
      console.log("User created successfully:", user);
      refetchUsers();
      handelOpenModal();
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
    },
  });

  const { toggleUserStatus, isLoading: toggleLoading } = useToggleUserStatus({
    onSuccess: (updatedUser) => {
      console.log("User status updated:", updatedUser);
      refetchUsers();
    },
    onError: (error, userId) => {
      console.error("Failed to toggle user status:", error);
    },
  });

  useDebouncedValue(query, 300, (debouncedValue) => {
    console.log("Debounced search:", debouncedValue);
    setSearchQuery(debouncedValue);
  });

  const handelOpenModal = () => {
    setState(() => !state);
  };

  const handleSubmit = async (userData: UserFormData) => {
    console.log("Creating user:", userData);
    await createUser(userData);
  };

  const handleSearchChange = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <section className={style.homeContainer}>
      <header className={style.home__search}>
        <div
          className={`${style.home__stats} ${
            userLoading ? style.loading : ""
          } ${!users ? style.empty : ""}`}
        >
          {users && users.length > 0 ? (
            <UserStatistics users={users} />
          ) : (
            <span> No users to display </span>
          )}
        </div>

        <SearchBar query={query} setQuery={handleSearchChange} />
      </header>

      <UserTable
        users={users}
        isLoading={userLoading}
        error={userError}
        onToggleStatus={toggleUserStatus}
        toggleLoading={toggleLoading}
      >
        <ButtonAddUser onClick={handelOpenModal} />
      </UserTable>

      {pagination && pagination.totalPages > 1 && (
        <div className={style.pagination}>
          <button onClick={prevPage} disabled={!pagination.hasPrev}>
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button onClick={nextPage} disabled={!pagination.hasNext}>
            Next
          </button>
        </div>
      )}

      <UserForm
        closeModal={handelOpenModal}
        isLoading={createLoading}
        onCreate={handleSubmit}
      />
    </section>
  );
};

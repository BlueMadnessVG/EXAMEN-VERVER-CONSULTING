import { useCallback, useEffect, useState } from "react";
import type { PaginatedUserResponse, User } from "../schemas";
import { getUsers } from "../services";
import { SnackbarUtilities } from "../utils";

interface useGetUsersProps {
  autoFetch?: boolean;
  initialPage?: number;
  pageSize?: number;
  limit?: number;
  onSuccess?: (response: PaginatedUserResponse) => void;
  onError?: (error: unknown) => void;
}

interface useGetUserReturn {
  users: User[] | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  nextPage: () => void;
  prevPage: () => void;
  setLimit: (newLimit: number) => void;

  setSearchQuery: (query: string) => void;

  fetchUsers: (params?: {
    page?: number;
    search?: string;
    status?: string;
  }) => Promise<void>;
  refetch: () => Promise<void>;
  resetError: () => void;
  resetState: () => void;
}

export const useGetUsers = ({
  autoFetch = true,
  initialPage = 1,
  limit = 10,
  onSuccess,
  onError,
}: useGetUsersProps = {}): useGetUserReturn => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [pagination, setPagination] = useState({
    page: initialPage,
    limit,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const calculatePagination = useCallback(
    (page: number, limit: number, total: number) => {
      const totalPages = Math.ceil(total / limit);
      return {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      };
    },
    []
  );

  const resetError = () => {
    setError(null);
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
    setUsers(null);
    setSearchQuery("");
    setPagination(calculatePagination(initialPage, limit, 0));
  }, [initialPage, limit, calculatePagination]);

  const fetchUsers = useCallback(
    async (
      params: {
        page?: number;
        search?: string;
        keepCurrentData?: boolean;
      } = {}
    ): Promise<void> => {
      const {
        page = pagination.page,
        search = searchQuery,
        keepCurrentData = false,
      } = params;

      setIsLoading(true);
      if (!keepCurrentData) {
        setError(null);
        setIsSuccess(false);
      }

      try {
        const response = await getUsers({
          search,
          page,
          limit: pagination.limit,
        });

        setUsers(response.items);
        const updatedPagination = calculatePagination(
          response.page,
          response.limit,
          response.total
        );
        setPagination(updatedPagination);
        setIsSuccess(true);

        if (!keepCurrentData) {
          SnackbarUtilities.success(`Loaded ${response.items.length} users`);
        }
        onSuccess?.(response);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch users";
        setError(errorMessage);

        if (!keepCurrentData) {
          SnackbarUtilities.error(`Error: ${errorMessage}`);
        }
        onError?.(err);
      } finally {
        setIsLoading(false);
      }
    },
    [
      pagination.page,
      pagination.limit,
      searchQuery,
      calculatePagination,
      onSuccess,
      onError,
    ]
  );

  //Pagination actions
  const nextPage = useCallback(() => {
    if (pagination.hasNext) {
      fetchUsers({ page: pagination.page + 1 });
    }
  }, [fetchUsers, pagination.hasNext, pagination.page]);

  const prevPage = useCallback(() => {
    if (pagination.hasPrev) {
      fetchUsers({ page: pagination.page - 1 });
    }
  }, [fetchUsers, pagination.hasPrev, pagination.page]);

  const setLimit = useCallback(
    (newLimit: number) => {
      setPagination((prev) => calculatePagination(1, newLimit, prev.total));
    },
    [calculatePagination]
  );

  //Search Function
  const handleSetSearchQuery = useCallback(
    (query: string) => {
      setSearchQuery(query);
      fetchUsers({ search: query, page: 1 });
    },
    [fetchUsers]
  );

  useEffect(() => {
    if (autoFetch) {
      fetchUsers();
    }
  }, [autoFetch]);

  return {
    users,
    isLoading,
    error,
    isSuccess,

    pagination,
    nextPage,
    prevPage,
    setLimit,

    setSearchQuery: handleSetSearchQuery,

    fetchUsers,
    refetch: () => fetchUsers(),
    resetError,
    resetState,
  };
};

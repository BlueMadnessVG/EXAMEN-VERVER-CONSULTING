import { useCallback, useState } from "react";
import type { User, UserFormData } from "../schemas";
import { createUser } from "../services";
import { SnackbarUtilities } from "../utils";

interface useCreateUserProps {
  onSuccess?: (user?: User) => void;
  onError?: (error: unknown, userData: UserFormData) => void;
}

interface useCreateUserReturn {
  createUser: (userData: UserFormData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
  isSuccess: boolean;
  createdUser: User | null;
}

export const useCreateUser = ({
  onSuccess,
  onError,
}: useCreateUserProps = {}): useCreateUserReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdUser, setCreatedUser] = useState<User | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
    setCreatedUser(null);
  }, []);

  const handleCreateUser = useCallback(
    async (userData: UserFormData): Promise<void> => {
      resetState();
      setIsLoading(true);

      try {
        const newUser = await createUser(userData);

        setCreatedUser(newUser);
        setIsSuccess(true);

        SnackbarUtilities.success(`User ${newUser.name} created successfully!`);
        onSuccess?.(newUser);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create user";
        setError(errorMessage);

        SnackbarUtilities.error(`Error: ${errorMessage}`);
        onError?.(err, userData);
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError, resetState]
  );

  return {
    createUser: handleCreateUser,
    isLoading,
    error,
    resetError,
    isSuccess,
    createdUser,
  };
};

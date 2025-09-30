import { useCallback, useState } from "react";
import type { User } from "../schemas";
import { toggleUserStatus } from "../services";
import { SnackbarUtilities } from "../utils";

interface useToggleUserStatusProps {
  onSuccess?: (user: User) => void;
  onError?: (error: unknown, userId: string) => void;
}

interface useToggleUserStatusReturn {
  toggleUserStatus: (userId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
  isSuccess: boolean;
  updatedUser: User | null;
}

export const useToggleUserStatus = ({
  onSuccess,
  onError,
}: useToggleUserStatusProps = {}): useToggleUserStatusReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const handleToggleStatus = useCallback(
    async (userId: string): Promise<void> => {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);
      setUpdatedUser(null);

      try {
        const user = await toggleUserStatus(userId);

        setUpdatedUser(user);
        setIsSuccess(true);

        SnackbarUtilities.success(`User changed successfully!`);
        onSuccess?.(user);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to toggle user status";
        setError(errorMessage);

        // Show error message
        SnackbarUtilities.error(`Error: ${errorMessage}`);

        // Call error callback
        onError?.(err, userId);
      } finally {
        setIsLoading(false);
      }
    }, [onSuccess, onError]
  );

  return {
    toggleUserStatus: handleToggleStatus,
    isLoading,
    error,
    resetError,
    isSuccess,
    updatedUser
  }
};

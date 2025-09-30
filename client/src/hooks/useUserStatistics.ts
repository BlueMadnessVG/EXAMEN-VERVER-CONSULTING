import { useMemo } from "react";
import type { User } from "../schemas";

interface useUserStatisticsProps {
  users: User[] | null;
}

interface useUserStatisticsReturn {
  orgCount: number;
  totalUsers: number;
  orgPercentage: number;
}

export const useUserSadistic = ({
  users,
}: useUserStatisticsProps): useUserStatisticsReturn => {
  return useMemo(() => {
    if (!users || users.length === 0) {
      return {
        orgCount: 0,
        totalUsers: 0,
        orgPercentage: 0,
      };
    }

    const totalUsers = users.length;
    const orgCount = users.filter((user) =>
      user.email.toLowerCase().endsWith(".org")
    ).length;
    const orgPercentage = totalUsers > 0 ? (orgCount / totalUsers) * 100 : 0;

    return {
      orgCount,
      totalUsers,
      orgPercentage: Math.round(orgPercentage * 100) / 100,
    };
  }, [users]);
};

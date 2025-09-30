import style from "./css/UserStatistics.module.css";
import { useUserSadistic } from "../../hooks/useUserStatistics";
import type { User } from "../../schemas";

interface UserStatisticsProps {
  users: User[] | null;
}

export const UserStatistics = ({ users }: UserStatisticsProps) => {
  const statistics = useUserSadistic({ users });

  return (
    <>
      <div className={`${style.statItem} ${style.totalStat}`}>
        <span className={style.statLabel}>Total</span>
        <span className={style.statValue}>{statistics.totalUsers}</span>
      </div>
      <div className={`${style.statItem} ${style.orgStat}`}>
        <span className={style.statLabel}>.org</span>
        <span className={style.statValue}>{statistics.orgCount}</span>
        <span className={style.statSubtext}>{statistics.orgPercentage}%</span>
      </div>
    </>
  );
};

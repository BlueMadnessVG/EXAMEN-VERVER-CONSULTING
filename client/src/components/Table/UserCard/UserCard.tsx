import style from "./css/UserCard.module.css";
import type { User } from "../../../schemas";
import { memo } from "react";

interface UserCardProps {
  user: User;
  onToggle: (userId: string) => void;
  isToggleLoading?: boolean
}

export const UserCard = memo(
  ({ user, onToggle, isToggleLoading = false }: UserCardProps) => {

    const getHoverBorderColor = () => {
      return user.active ? style.userCardActive : style.userCardInactive;
    };

    const getToggleButtonColor = () => {
      return user.active
        ? style.userCard__ButtonDeactivate
        : style.userCard__ButtonActivate;
    };

    return (
      <div className={`${style.userCard} ${getHoverBorderColor()}`}>
        {/* Compact Header */}
        <div className={style.userCard__Header}>
          <div className={style.userCard__Identity}>
            <h3 className={style.userCard__Name}>{user.name}</h3>
            <span className={style.userCard__Email}>{user.email}</span>
          </div>
          <div
            className={`${style.userCard__Status} ${
              user.active ? style.userCard__StatusActive : ""
            }`}
          >
            {user.active ? "✓" : "●"}
          </div>
        </div>

        {/* Minimal Info */}
        <div className={style.userCard__Info}>
          <div className={style.userCard__Detail}>
            <span className={style.userCard__Label}>ID:</span>
            <span className={style.userCard__Value}>{user.id}</span>
          </div>
          {user.city && (
            <div className={style.userCard__Detail}>
              <span className={style.userCard__Label}>Ciudad:</span>
              <span className={style.userCard__Value}>{user.city}</span>
            </div>
          )}
        </div>

        {/* Simple Actions */}
        <div className={style.userCard__Actions}>
          <button
            onClick={() => onToggle(user.id)}
            disabled={isToggleLoading}
            className={`${style.userCard__Button} ${getToggleButtonColor()}`}
            title={user.active ? "Deactivate user" : "Activate user"}
          >
            {isToggleLoading ? "..." : user.active ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>
    );
  }
);

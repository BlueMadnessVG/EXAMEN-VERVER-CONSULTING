import { FlipText } from "../../Text";
import style from "./css/ButtonAddUser.module.css";
import { motion } from "motion/react";

interface ButtonAddUserProps {
  onClick: () => void;
}

export const ButtonAddUser = ({ onClick }: ButtonAddUserProps) => {
  return (
    <motion.button
      initial="initial"
      whileHover="hovered"
      className={style.buttonAddUser}
      onClick={onClick}
    >
      <FlipText active={false}>+ Add User</FlipText>
    </motion.button>
  );
};

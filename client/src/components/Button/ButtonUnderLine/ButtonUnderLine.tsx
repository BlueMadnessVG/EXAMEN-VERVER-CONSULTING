import style from "./css/ButtonUnderLine.module.css";

import type { ReactNode } from "react";
import { easeInOut, motion } from "motion/react";

const underlineVariants = {
  initial: { scaleX: 0, originX: 0 },
  hovered: { scaleX: 1, transition: { duration: 0.3, ease: easeInOut } },
};

interface ButtonUnderLineProps {
  children: ReactNode;
  text_color?: string;
  bg_color?: string;
  full_width?: boolean;
}

export const ButtonUnderLine = ({
  children,
  text_color = "#66C0F4",
  bg_color,
  full_width = false,
}: ButtonUnderLineProps) => {
  return (
    <motion.div
      initial="initial"
      animate="initial"
      whileHover="hovered"
      className={`${style.buttonUnderLine} ${
        full_width ? style.fullWidth : ""
      }`}
      style={{ background: bg_color }}
    >
      {children}
      <motion.div
        variants={underlineVariants}
        className={style.buttonUnderLine__line}
        style={{ background: text_color }}
      />
    </motion.div>
  );
};

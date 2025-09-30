import style from "./css/FlipText.module.css";

import type { ReactNode } from "react";
import { motion, backInOut, easeInOut } from "motion/react";

const _Duration = 0.25;
const _Stagger = 0.05;

const firstTextMotion = {
  variant: { initial: { y: 0 }, hovered: { y: -100 } },
  transition: { duration: _Duration, ease: backInOut, delay: _Stagger },
};

const secondTextMotion = {
  variant: { initial: { y: 100 }, hovered: { y: 4, x: -4 } },
  transition: { duration: _Duration, ease: easeInOut, delay: _Stagger },
};

interface FlipTextProps {
  children: ReactNode;
  active: boolean;
}

export const FlipText = ({ children, active }: FlipTextProps) => {
  return (
    <motion.div
      className={style.flipText}
    >
      <motion.div
        className={`${style.flipText__inner} ${
          active ? style.activeState : style.inactiveState
        }`}
      >
        <div>
          <motion.span
            variants={firstTextMotion.variant}
            transition={firstTextMotion.transition}
            className={style.flipText__content}
          >
            {children}
          </motion.span>
        </div>

        <div className={style.flipText__layer}>
          <motion.span
            variants={secondTextMotion.variant}
            transition={secondTextMotion.transition}
            className={`${style.flipText__content} ${style.activeState}`}
          >
            {children}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

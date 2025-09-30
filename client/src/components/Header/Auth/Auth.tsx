import style from "./css/Auth.module.css";
import { ButtonUnderLine } from "../../Button/ButtonUnderLine/ButtonUnderLine";

export const Auth = () => {
  return (
    <div className={style.auth}>
      <ButtonUnderLine text_color="#fff" bg_color="#66C0F4" full_width={true}>
        <button className={style.auth__button} aria-label="Login">
          LogIn
        </button>
      </ButtonUnderLine>
    </div>
  );
};

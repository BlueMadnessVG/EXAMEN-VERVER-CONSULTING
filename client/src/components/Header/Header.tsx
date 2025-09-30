import style from "./css/Header.module.css"
import { Auth } from "./Auth/Auth"

export const Header = () => {
    
    return (
        <header className={style.header}>
            <h1 className={style.logo}>UserVault</h1>

            <Auth />
        </header>
    )
}
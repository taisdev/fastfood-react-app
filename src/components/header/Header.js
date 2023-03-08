import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logoImg from "../../assets/logo.png";
import logoBranca from "../../assets/logoBranca.png";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const hideMenu = () => {
        setShowMenu(false);
    };

    const cart = (
        <span className={styles.cart}>
            <Link to="/cart">
                {" "}
                <FaShoppingCart size={24} />
                <p>0</p>{" "}
            </Link>
        </span>
    );

    const navLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

    return (
        <header>
            <div className={styles.header}>
                <Link to="/">
                    <img src={logoImg} alt="logo" />
                </Link>
                <nav
                    className={
                        showMenu
                            ? `${styles["show-nav"]}`
                            : `${styles["hide-nav"]}`
                    }
                >
                    <div
                        className={
                            showMenu
                                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                                : `${styles["nav-wrapper"]}`
                        }
                        onClick={hideMenu}
                    ></div>
                    <ul onClick={hideMenu}>
                        <li className={styles["logo-mobile"]}>
                            <img src={logoBranca} alt="logo" />
                            <FaTimes size={22} color="#ffffff" />
                        </li>
                    </ul>
                    <div className={styles["header-right"]} onClick={hideMenu}>
                        <span className={styles.links}>
                            <NavLink to={"/"} className={navLink}>
                                Cardápio
                            </NavLink>
                        </span>
                        <span className={styles.links}>
                            <NavLink to="/login" className={navLink}>
                                entrar
                            </NavLink>
                        </span>
                        <span className={styles.links}>{cart}</span>
                    </div>
                </nav>
                <div className={styles["menu-icon"]}>
                    {cart}
                    <HiOutlineMenuAlt3
                        size={28}
                        color="#DC0404"
                        onClick={toggleMenu}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;

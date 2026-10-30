import { NavLink } from "react-router";
import styles from "./Menu.module.css";

const style = ({ isActive }) => ({
  fontWeight: isActive ? "bold" : "normal",
  textDecoration: isActive ? "underline" : "none",
});

function Menu() {
  return (
    <nav className={styles.menu}>
      <NavLink to="/" end style={style}>
        Accueil
      </NavLink>

      <NavLink to="/produits" style={style}>
        Produits
      </NavLink>

      <NavLink to="/inscription" style={style}>
        Inscription
      </NavLink>

      <NavLink to="/connexion" style={style}>
        Connexion
      </NavLink>

      <NavLink to="/contact" style={style}>
        Contact
      </NavLink>
    </nav>
  );
}

export default Menu;
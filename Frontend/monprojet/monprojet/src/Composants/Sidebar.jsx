import { Link } from "react-router";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2>Catégories</h2>
      <ul>
        <li><Link to="/produits">Toutes</Link></li>
        <li><Link to="/produits?categorie=Claviers">Claviers</Link></li>
        <li><Link to="/produits?categorie=Souris">Souris</Link></li>
        <li><Link to="/produits?categorie=Écrans">Écrans</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
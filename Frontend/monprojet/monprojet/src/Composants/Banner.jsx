import { NavLink } from "react-router";
import styles from "./Banner.module.css";

function Banner({ recherche, setRecherche, utilisateur, deconnexion }) {
  return (
    <header className={styles.banner}>
      <h1>Ma Boutique</h1>

      <input
        type="search"
        className={styles.recherche}
        placeholder="Rechercher un produit..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />

      <nav>
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/produits">Produits</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        {utilisateur ? (
          <>
            <NavLink to="/ajout-produit">Ajouter un produit</NavLink>
            <button onClick={deconnexion}>Déconnexion</button>
          </>
        ) : (
          <>
            <NavLink to="/inscription">Inscription</NavLink>
            <NavLink to="/connexion">Connexion</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Banner;
import { Link, useOutletContext } from "react-router";

function Accueil() {
  const utilisateur = useOutletContext()?.utilisateur;

  return (
    <div>
      <h2>Bienvenue sur Ma Boutique</h2>
      <p>Découvre notre catalogue de produits.</p>

      {utilisateur ? (
        <Link to="/produits">Voir les produits</Link>
      ) : (
        <p>
          <Link to="/connexion">Connecte-toi</Link> ou{" "}
          <Link to="/inscription">crée un compte</Link> pour accéder aux produits.
        </p>
      )}
    </div>
  );
}

export default Accueil;
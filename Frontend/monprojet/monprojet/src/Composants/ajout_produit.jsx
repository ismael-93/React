import { useState } from "react";
import { Link, useOutletContext } from "react-router";
import styles from "./Inscription.module.css";

function AjoutProduit() {
  const [formulaire, setFormulaire] = useState({ nom: "", prix: "" });
  const [message, setMessage] = useState("");
  const utilisateur = useOutletContext()?.utilisateur;

  const handleChange = (e) => {
    setFormulaire({ ...formulaire, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/produits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formulaire),
    });
    const data = await res.json();

    if (!res.ok) {
      setMessage(data.erreur);
      return;
    }

    setMessage("Produit ajouté !");
    setFormulaire({ nom: "", prix: "" });
  };

  if (!utilisateur) {
    return (
      <p>
        Connecte-toi pour ajouter un produit.{" "}
        <Link to="/connexion">Se connecter</Link>
      </p>
    );
  }

  return (
    <div className={styles.formulaire}>
      <h2>Ajouter un produit</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.champ}>
          <label htmlFor="nom">Nom :</label>
          <input id="nom" name="nom" value={formulaire.nom} onChange={handleChange} />
        </div>

        <div className={styles.champ}>
          <label htmlFor="prix">Prix (€) :</label>
          <input
            id="prix"
            name="prix"
            type="number"
            step="0.01"
            min="0"
            value={formulaire.prix}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Ajouter</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default AjoutProduit;
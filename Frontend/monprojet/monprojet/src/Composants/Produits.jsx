import { useState, useEffect } from "react";
import { Navigate, useOutletContext, useSearchParams } from "react-router";
import styles from "./Inscription.module.css";

function Produits() {
  const [produits, setProduits] = useState([]);
  const [formulaire, setFormulaire] = useState({ nom: "", prix: "", categorie: "" });
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const categorie = searchParams.get("categorie") ?? "";

  const contexte = useOutletContext();
  const recherche = contexte?.recherche ?? "";
  const utilisateur = contexte?.utilisateur;

  const chargerProduits = () => {
    const url = categorie
      ? `/api/produits?categorie=${encodeURIComponent(categorie)}`
      : "/api/produits";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProduits(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Erreur API :", err));
  };

  useEffect(() => {
    if (!utilisateur) {
      setProduits([]);
      return;
    }
    chargerProduits();
  }, [utilisateur, categorie]);

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
    setFormulaire({ nom: "", prix: "", categorie: "" });
    chargerProduits();
  };

  if (!utilisateur) {
    return <Navigate to="/connexion" replace />;
  }

  const produitsFiltres = produits.filter((p) =>
    p.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div>

      

      {produitsFiltres.length === 0 && <p>Aucun produit trouvé.</p>}

      <div className="grille-produits">
        {produitsFiltres.map((p) => (
          <div key={p.id} className="carte-produit">
            <div className="carte-image"></div>
            <h3>{p.nom}</h3>
            <p className="carte-prix">{p.prix} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Produits;
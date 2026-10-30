import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import styles from "./Connexion.module.css";

function Connexion() {
  const [formulaire, setFormulaire] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { setUtilisateur } = useOutletContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormulaire({ ...formulaire, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formulaire),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Email ou mot de passe incorrect.");
        return;
      }

      const user = data.utilisateur ?? { email: formulaire.email };
      localStorage.setItem("utilisateur", JSON.stringify(user));
      setUtilisateur(user);
      navigate("/produits");
    } catch (err) {
      console.error(err);
      setMessage("Serveur injoignable.");
    }
  };

  return (
    <div className={styles.formulaire}>
      <h2>Connexion</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.champ}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formulaire.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.champ}>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formulaire.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Se connecter</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Connexion;
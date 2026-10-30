import styles from "./Inscription.module.css";
import { useState } from "react";

const LONGUEUR_MIN_NOM = 5;
const LONGUEUR_MIN_PRENOM = 5;
const LONGUEUR_MIN_MDP = 12;

function verifierNom(valeur) {
  if (valeur.trim().length < LONGUEUR_MIN_NOM) {
    return `Le nom doit contenir au moins ${LONGUEUR_MIN_NOM} caractères.`;
  }
  return "";
}

function verifierPrenom(valeur) {
  if (valeur.trim().length < LONGUEUR_MIN_PRENOM) {
    return `Le prénom doit contenir au moins ${LONGUEUR_MIN_PRENOM} caractères.`;
  }
  return "";
}

function verifierEmail(valeur) {
  if (!valeur.includes("@")) {
    return "L'email doit contenir un @.";
  }
  return "";
}

function verifierMdp(valeur) {
  if (valeur.length < LONGUEUR_MIN_MDP) {
    return `Le mot de passe doit contenir au moins ${LONGUEUR_MIN_MDP} caractères.`;
  }
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(valeur)) {
    return "Le mot de passe doit contenir un caractère spécial.";
  }
  return "";
}

function Inscription() {
  const [Formulaire, setFormulaire] = useState({
    prenom: "",
    nom: "",
    email: "",
    mdp: "",
  });

  const [erreurFormulaire, setErreurFormulaire] = useState({
    prenom: "",
    nom: "",
    email: "",
    mdp: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // On revérifie tout au clic
    const erreurs = {
      prenom: verifierPrenom(Formulaire.prenom),
      nom: verifierNom(Formulaire.nom),
      email: verifierEmail(Formulaire.email),
      mdp: verifierMdp(Formulaire.mdp),
    };
    setErreurFormulaire(erreurs);

    if (Object.values(erreurs).some((err) => err)) {
      setMessage("Corrige les erreurs avant de continuer.");
      return;
    }

    try {
      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: Formulaire.nom,
          prenom: Formulaire.prenom,
          email: Formulaire.email,
          password: Formulaire.mdp,
        }),
      });
      const data = await res.json();
      console.log(res.status, data);
      setMessage(data.message);

      if (res.ok) {
        setFormulaire({ prenom: "", nom: "", email: "", mdp: "" });
      }
    } catch (err) {
      console.error(err);
      setMessage("Serveur injoignable.");
    }
  };

  return (
    <div className={styles.formulaire}>
      <h2>Inscription</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.champ}>
          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            id="nom"
            value={Formulaire.nom}
            onChange={(e) => {
              setFormulaire({ ...Formulaire, nom: e.target.value });
              setErreurFormulaire({ ...erreurFormulaire, nom: verifierNom(e.target.value) });
            }}
          />
          {erreurFormulaire.nom && <p>{erreurFormulaire.nom}</p>}
        </div>

        <div className={styles.champ}>
          <label htmlFor="prenom">Prénom :</label>
          <input
            type="text"
            id="prenom"
            value={Formulaire.prenom}
            onChange={(e) => {
              setFormulaire({ ...Formulaire, prenom: e.target.value });
              setErreurFormulaire({ ...erreurFormulaire, prenom: verifierPrenom(e.target.value) });
            }}
          />
          {erreurFormulaire.prenom && <p>{erreurFormulaire.prenom}</p>}
        </div>

        <div className={styles.champ}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={Formulaire.email}
            onChange={(e) => {
              setFormulaire({ ...Formulaire, email: e.target.value });
              setErreurFormulaire({ ...erreurFormulaire, email: verifierEmail(e.target.value) });
            }}
          />
          {erreurFormulaire.email && <p>{erreurFormulaire.email}</p>}
        </div>

        <div className={styles.champ}>
          <label htmlFor="mdp">Mot de passe :</label>
          <input
            type="password"
            id="mdp"
            value={Formulaire.mdp}
            onChange={(e) => {
              setFormulaire({ ...Formulaire, mdp: e.target.value });
              setErreurFormulaire({ ...erreurFormulaire, mdp: verifierMdp(e.target.value) });
            }}
          />
          {erreurFormulaire.mdp && <p>{erreurFormulaire.mdp}</p>}
        </div>

        <button type="submit">S'inscrire</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Inscription;
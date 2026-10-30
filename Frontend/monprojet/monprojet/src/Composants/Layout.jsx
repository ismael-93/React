import { useState } from "react";
import { Outlet } from "react-router";
import Banner from "./Banner";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Sidebardroite from "./Sidebardroite";
import styles from "./Layout.module.css";

export default function Layout() {
  const [recherche, setRecherche] = useState("");

  const [utilisateur, setUtilisateur] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("utilisateur"));
    } catch {
      return null;
    }
  });

  function deconnexion() {
    localStorage.removeItem("utilisateur");
    setUtilisateur(null);
    navigate("/connexion");
  }

  return (
    <div className={styles.layout}>
      <div style={{ gridArea: "banner" }}>
        <Banner
          recherche={recherche}
          setRecherche={setRecherche}
          utilisateur={utilisateur}
          deconnexion={deconnexion}
        />
      </div>

      <div style={{ gridArea: "sidebar" }}>
        <Sidebar />
      </div>

      <main style={{ gridArea: "content" }}>
        <Outlet context={{ recherche, utilisateur, setUtilisateur }} />
      </main>

      <div style={{ gridArea: "right" }}>
        <Sidebardroite />
      </div>

      <div style={{ gridArea: "footer" }}>
        <Footer />
      </div>
    </div>
  );
}
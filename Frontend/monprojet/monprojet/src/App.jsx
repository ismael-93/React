import { Routes, Route } from "react-router";
import Layout from "./Composants/Layout";
import Produits from "./Composants/Produits";
import Connexion from "./Composants/Connexion";
import Inscription from "./Composants/Inscription";
import AjoutProduit from "./Composants/ajout_produit";
import Accueil from "./Composants/Accueil";


function Contact() {
  return <h2>Contact</h2>;
}

function NotFound() {
  return <h2>Page introuvable</h2>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Accueil />} />
        <Route path="produits" element={<Produits />} />
        <Route path="inscription" element={<Inscription />} />
        <Route path="connexion" element={<Connexion />} />
        <Route path="ajout-produit" element={<AjoutProduit />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
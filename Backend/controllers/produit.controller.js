import { db } from "../db.js";

export function listerProduits(req, res) {
  const { categorie } = req.query;

  const produits = categorie
    ? db.prepare("SELECT id, nom, prix, categorie FROM produits WHERE categorie = ?").all(categorie)
    : db.prepare("SELECT id, nom, prix, categorie FROM produits").all();

  res.json(produits);
}

export function ajouterProduit(req, res) {
  const { nom, prix, categorie } = req.body;

  if (!nom || nom.trim() === "" || prix === "" || isNaN(prix) || Number(prix) < 0) {
    return res.status(400).json({ erreur: "Nom et prix valides obligatoires." });
  }

  const resultat = db
    .prepare("INSERT INTO produits (nom, prix, categorie) VALUES (?, ?, ?)")
    .run(nom.trim(), Number(prix), categorie || null);

  res.status(201).json({
    id: resultat.lastInsertRowid,
    nom: nom.trim(),
    prix: Number(prix),
    categorie: categorie || null,
  });
}
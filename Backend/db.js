import Database from "better-sqlite3";

 

export const db = new Database("boutique.db"); // créé automatiquement

//db.pragma("journal_mode = WAL");   // meilleures performances en lecture

db.pragma("foreign_keys = ON");    // active les clés étrangères


db.exec(`
  CREATE TABLE IF NOT EXISTS utilisateurs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    mot_de_passe TEXT NOT NULL,
    cree_le TEXT DEFAULT (datetime('now'))
  );
 
  CREATE TABLE IF NOT EXISTS produits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prix REAL NOT NULL

  );
`);
 
// Données de départ si la table est vide
const { total } = db.prepare("SELECT COUNT(*) AS total FROM produits").get();
if (total === 0) {
  const ajouter = db.prepare("INSERT INTO produits (nom, prix) VALUES (?, ?)");
  ajouter.run("Clavier", 49);
  ajouter.run("Souris", 25);
}

// Catalogue : tous les produits
export function getProduits() {
  return db.prepare("SELECT id, nom, prix FROM produits").all();
}

// Un seul produit par son id
export function getProduit(id) {
  return db.prepare("SELECT id, nom, prix FROM produits WHERE id = ?").get(id);
}

// Ajoute la colonne categorie si elle n'existe pas encore
const colonnes = db.prepare("PRAGMA table_info(produits)").all().map((c) => c.name);
if (!colonnes.includes("categorie")) {
  db.exec("ALTER TABLE produits ADD COLUMN categorie TEXT");
  db.exec("UPDATE produits SET categorie = 'Claviers' WHERE nom = 'Clavier'");
  db.exec("UPDATE produits SET categorie = 'Souris' WHERE nom = 'Souris'");
}
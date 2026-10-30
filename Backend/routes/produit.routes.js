import { Router } from "express";
import { listerProduits, ajouterProduit } from "../controllers/produit.controller.js";

const router = Router();

// GET /api/produits : liste du catalogue
router.get("/", listerProduits);

// POST /api/produits : ajout d'un produit
router.post("/", ajouterProduit);

export default router;
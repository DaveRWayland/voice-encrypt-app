import { Router } from "express";
import { encryptText, decryptText } from "../controllers/encryptionController";

const router = Router();

// POST /api/encrypt - Encripta
router.post("/encrypt", encryptText);

//POST /api/decrypt - Desencripta
router.post("/decrypt", decryptText);

export default router;

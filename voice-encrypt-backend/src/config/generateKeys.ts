/**
 *  ------------------ 🔑 GENERATE KEYS ------------------
 *
 *  Script para generar las llaves RSA publicas y privadas.
 *  Las llaves se guardan en la carpeta Keys
 *
 *  @function generateKeys
 *  @description Genera un par de llaves RSA utilizando el esquema de cifrado PKCS#1.
 *  @returns void
 *
 *  --------------------------------------------------------
 * */

import NodeRSA from "node-rsa";
import fs from "fs";
import path from "path";

const generateKeys = () => {
	const key = new NodeRSA({ b: 2048 });
	key.setOptions({
		encryptionScheme: "pkcs1_oaep",
	});

	const publicKey = key.exportKey("public");
	const privateKey = key.exportKey("private");

	const keysDir = path.join(__dirname, "../../keys");

	if (!fs.existsSync(keysDir)) {
		fs.mkdirSync(keysDir, { recursive: true });
	}

	fs.writeFileSync(path.join(keysDir, "public.key"), publicKey);
	fs.writeFileSync(path.join(keysDir, "private.key"), privateKey);
};

generateKeys();

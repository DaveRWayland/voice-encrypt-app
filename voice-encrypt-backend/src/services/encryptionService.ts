/**
 * --------------- 🔗 RSA ENCRYPT SERVICES --------------
 *
 *  Este servicio maneja la encriptacion y
 *  desencriptacion de textos usando el algoritmo
 *  RSA con el algoritmo de padding OAEP
 *
 * -------------------------------------------------------
 */

import NodeRSA from 'node-rsa';
import fs from 'fs';
import path from 'path';

export class EncryptionService {
	private publicKey: NodeRSA;
	private privateKey: NodeRSA;

	constructor() {
		const publicKeyPath = path.join(__dirname, '../../keys/public.key');
		const privateKeypath = path.join(__dirname, '../../keys/private.key');
		const publicKeyContent = fs.readFileSync(publicKeyPath, 'utf8');
		const privateKeyContent = fs.readFileSync(privateKeypath, 'utf8');

		this.publicKey = new NodeRSA(publicKeyContent, 'public');
		this.privateKey = new NodeRSA(privateKeyContent, 'private');

		this.publicKey.setOptions({
			encryptionScheme: 'pkcs1_oaep',
		});

		this.privateKey.setOptions({
			encryptionScheme: 'pkcs1_oaep',
		});
	}

	/**
	 * ------------------- 🔒 ENCRYPT TEXT ------------------
	 *
	 *  @method encrypt
	 *  @description Este metodo encripta un texto
	 *  @param Text - El texto a encriptar
	 *  @returns String - El texto encriptado en base64
	 *
	 * -------------------------------------------------------
	 */

	encrypt(text: string): string {
		try {
			const encrypted = this.publicKey.encrypt(text, 'base64');
			return encrypted;
		} catch (error) {
			throw new Error(`Error al desencriptar. Error: ${error}`);
		}
	}

	/**
	 * ------------------- 🔓 DECRYPT TEXT ------------------
	 *
	 *  @method decrypt
	 *  @description Este metodo desencripta un texto encriptado
	 *  @param encryptedText - El texto encriptado en base64
	 *  @returns String - El texto desencriptado
	 *
	 * -------------------------------------------------------
	 */

	decrypt(encryptedText: string): string {
		try {
			const decrypted = this.privateKey.decrypt(encryptedText, 'utf8');
			return decrypted;
		} catch (error) {
			throw new Error(`Error al desencriptar. Error: ${error}`);
		}
	}

	/**
	 * ------------------ 🔓 GET PUBLIC KEY -----------------
	 *
	 *  @method getPublicKey
	 *  @description Obtiene la llave publica
	 *  @param void
	 *  @returns String - La llave publica
	 *
	 * -------------------------------------------------------
	 */

	getPublicKey(): string {
		return this.publicKey.exportKey('public');
	}
}

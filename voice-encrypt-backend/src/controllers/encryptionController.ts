/**
 *
 * --------------- 🕹 ENCRYPTION CONTROLLER ---------------
 *
 *  Maneja las peticiones http relacionadas con la
 *  encriptación
 *
 * --------------------------------------------------------
 */
import { Request, Response } from 'express';
import { EncryptionService } from '../services/encryptionService';

const encryptionService = new EncryptionService();

/** ---------------------------------------------------------
 *
 *  POST /api/encrypt
 *  @description: Recibe un texto y lo devuelve encriptado
 *  @body { text: string }
 *
 * -----------------------------------------------------------
 * */

export const encryptText = (req: Request, res: Response) => {
	try {
		const { text } = req.body;
		const validateRegex = /^[a-zA-Z0-9\s.,!?'"()\-]+$/;

		if (!text || typeof text !== 'string' || !validateRegex.test(text)) {
			res.status(400).json({
				success: false,
				error: 'Ingrese un texto valido',
			});
			return;
		}
		const encryptedText = encryptionService.encrypt(text);
		res.status(200).json({
			success: true,
			encryptedText,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: `Error al encriptar. Error: ${error}`,
		});
	}
	/**
	 * --------------------------------------------------------
	 *
	 *  POST: /api/decrypt
	 *  @description: Desencripta un texto encriptado
	 *  @body { encryptedText: string }
	 *
	 * --------------------------------------------------------
	 */
};
export const decryptText = (req: Request, res: Response) => {
	try {
		const { encryptedText } = req.body;
		if (!encryptedText || typeof encryptedText !== 'string') {
			res.status(400).json({
				success: false,
				error: 'Ingrese un texto encriptado valido',
			});
			return;
		}
		const decryptedText = encryptionService.decrypt(encryptedText);
		res.status(200).json({
			success: true,
			decryptedText,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: `Error al desencriptar. Error: ${error}`,
		});
	}
};

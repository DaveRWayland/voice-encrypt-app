/** ----------------- 🧪 Encryption Service Testing -----------------
 *
 */
import { EncryptionService } from './encryptionService';

describe('EncryptionService', () => {
	let service: EncryptionService;

	beforeAll(() => {
		service = new EncryptionService();
	});

	test('Encriptacion de texto', () => {
		const texto = 'Dave123';
		const encriptado = service.encrypt(texto);

		expect(encriptado).toBeDefined();
		expect(encriptado).not.toBe(texto);
		expect(encriptado.length).toBeGreaterThan(0);
	});

	test('Desencriptacion de texto', () => {
		const textoOriginal = '123Dave';
		const encriptado = service.encrypt(textoOriginal);
		const desencriptado = service.decrypt(encriptado);

		expect(desencriptado).toBe(textoOriginal);
	});

	test('Longitud Maxima', () => {
		const textos = ['A', 'AB', 'ABC123', 'Test12345678901'];

		textos.forEach((texto) => {
			const encriptado = service.encrypt(texto);
			const desencriptado = service.decrypt(encriptado);
			expect(desencriptado).toBe(texto);
		});
	});

	test('Get Public Key', () => {
		const publicKey = service.getPublicKey();

		expect(publicKey).toBeDefined();
		expect(publicKey).toContain('-----BEGIN PUBLIC KEY-----');
		expect(publicKey).toContain('-----END PUBLIC KEY-----');
	});
});

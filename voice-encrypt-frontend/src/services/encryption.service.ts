/** ------------------ 🔒 ENCRYPTED SERVICE --------------------
 *
 *   Se comunica con el backend para encriptar y desencriptar textos
 *
 *  -----------------------------------------------------------
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * ---------------------- 📜 INTERFACES ------------------------
 */
export interface EncryptResponse {
  success: boolean;
  originalText: string;
  encryptedText: string;
  message: string;
}

export interface DecryptResponse {
  success: boolean;
  encryptedText: string;
  decryptedText: string;
  message: string;
}
export interface ApiError {
  success: boolean;
  error: string;
}

@Injectable({
  providedIn: 'root',
})
/** --------------- 🔏 ENCRYPTION SERVICE CLASS --------------------
 *
 *   Proporciona métodos para encriptar y desencriptar texto
 *   Utiliza HttpClient para comunicarse
 *   con un backend que maneja la lógica de encriptación y desencriptación
 *
 * -------------------------------------------------------------------
 */
export class EncryptionService {
  // 🔗 URL BASE DEL BACKEND

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /**
   * Encripta un texto
   * @param text - El texto a encriptar
   * @returns Observable con la respuesta de encriptación
   */
  encrypt(text: string): Observable<EncryptResponse> {
    return this.http
      .post<EncryptResponse>(`${this.apiUrl}/encrypt`, { text })
      .pipe(
        map((response) => {
          console.log('✅ Texto encriptado ');
          return response;
        }),
        catchError(this.handleError)
      );
  }

  /** ---------------------------------------------------------
   * @Description Desencripta el texto
   * @param encryptedText - El texto encriptado
   * @returns response con la desencriptación
   * ----------------------------------------------------------
   */
  decrypt(encryptedText: string): Observable<DecryptResponse> {
    return this.http
      .post<DecryptResponse>(`${this.apiUrl}/decrypt`, { encryptedText })
      .pipe(
        map((response) => {
          console.log('✅ Texto desencriptado ');
          return response;
        }),
        catchError(this.handleError)
      );
  }

  /**
   *  ------------- ❌ Errores  --------------
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido 😞';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.error && error.error.error) {
        errorMessage = error.error.error;
      } else {
        errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    console.error('❌ Error en la petición:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

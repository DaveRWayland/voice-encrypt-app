/** --------------- 🎤 VOICE RECOGNITION SERVICE ----------------
 *
 *  ervicio para manejar el reconocimiento de voz usando Speech API
 *  Permite iniciar, detener el reconocimiento de voz y emitir
 *  texto reconocido y manejar errores.
 *
 * ---------------------------------------------------------------
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

@Injectable({
  providedIn: 'root',
})

/** -------------- 🎩 RECOGNITION SERVICE CLASS ----------------
 *
 *  @class VoiceRecognitionService
 *  @description
 *  Maneja el reconocimiento de voz usando la Web Speech API.
 *  Permite iniciar y detener el reconocimiento, emitir texto reconocido,
 *  y el manejo de errores.
 *
 *  @property @private {BehaviorSubject<string>} textSubject - Subject para emitir texto
 *  @property @public  {Observable<string>} text$ - Observable del texto reconocido
 *  @property @private {BehaviorSubject<boolean>} listeningSubject - Subject para emitir el estado
 *  @property @public  {Observable<boolean>} listening$ - Observable del estado
 *  @property @private {BehaviorSubject<string>} errorSubject - Subject para emitir errores
 *  @property @public  {Observable<string>} error$ - Observable de los mensajes de error
 *  @property @private {RegExp} alphanumericRegex - Expresión regular para validar texto
 *  @property @private {number} MAX_LENGTH - Longitud permitida
 *
 * ---------------------------------------------------------------
 */
export class VoiceRecognitionService {
  private recognition: any = null;
  private isRestarting = false;
  private textSubject = new BehaviorSubject<string>('');
  public text$: Observable<string> = this.textSubject.asObservable();
  private listeningSubject = new BehaviorSubject<boolean>(false);
  public listening$: Observable<boolean> = this.listeningSubject.asObservable();
  private errorSubject = new BehaviorSubject<string>('');
  public error$: Observable<string> = this.errorSubject.asObservable();
  private alphanumericRegex = /^[a-zA-Z0-9 ]*$/;
  private readonly MAX_LENGTH = 15;

  // ---------------------- 🔨 CONSTRUCTOR -----------------------

  constructor() {
    if (typeof window !== 'undefined') {
      this.initRecognition();
    }
  }

  /** --------------------------------------------------------------
   *   @method initRecognition
   *   @description Configura la instancia de `SpeechRecognition`.
   *   @private
   *   @returns {void}
   *  --------------------------------------------------------------
   */
  private initRecognition(): void {
    const SpeechRecognition: any =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      this.errorSubject.next(
        'Ups! Tu navegador no soporta reconocimiento de voz.'
      );
      console.error('❌ SpeechRecognition no soportado.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-MX';
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      let transcript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      const cleanedText = this.cleanText(transcript);

      if (this.validateText(cleanedText)) {
        this.textSubject.next(cleanedText);
        this.errorSubject.next('');
      }
    };

    this.recognition.onstart = () => {
      console.log('🎤 Escuchando...');
      this.listeningSubject.next(true);
      this.errorSubject.next('');
    };

    this.recognition.onend = () => {
      console.log('🔇 Reconocimiento detenido');
      this.listeningSubject.next(false);

      if (this.isRestarting) {
        console.log('♻️ Reiniciando escucha...');
        this.isRestarting = false;
        this.start();
      }
    };

    // ---------------------- ⚠️ ERRORES ------------------------

    this.recognition.onerror = (event: any) => {
      console.warn('⚠️ Error SpeechRecognition:', event.error);

      let errorMessage = '';
      switch (event.error) {
        case 'no-speech':
          errorMessage =
            'Silencio detectado. ¿Cortaste comunicación con la máquina? 🤖';
          break;
        case 'audio-capture':
          errorMessage =
            'Ups, tu micro está bloqueado 🔒. Dale permiso y deja que te escuche';
          break;
        case 'not-allowed':
          errorMessage = 'Permiso denegado. 🎙️ Ayúdame a escucharte';
          break;
        case 'aborted':
          console.info(
            'Tranquilo, el micro se tomó un respiro 😮‍💨. Intentemos de nuevo'
          );
          return;
        default:
          errorMessage = `Error: ${event.error}`;
      }

      this.errorSubject.next(errorMessage);
      this.listeningSubject.next(false);
    };
  }

  /** --------------------------------------------------------------
   *   @method cleanText
   *   @description
   *   Limpia el texto de entrada eliminando espacios duplicados
   *   y caracteres invalidos
   *   @private
   *   @param {string} text - Texto a limpiar
   *   @returns {string} Texto procesado
   * ---------------------------------------------------------------
   */
  private cleanText(text: string): string {
    return text
      .trim()
      .replace(/\s{2,}/g, ' ')
      .replace(/[^a-zA-ZÀ-ÿ0-9 ]/g, '');
  }

  /** --------------------------------------------------------------
   *   @method validateText
   *   @description Verifica que el texto cumpla con el formato
   *   @private
   *   @param {string} text - Texto a validar
   *   @returns {boolean} `true` si el texto es válido, `false` si no lo es
   *  ---------------------------------------------------------------
   */
  private validateText(text: string): boolean {
    if (text.length > this.MAX_LENGTH) {
      this.errorSubject.next(`Maximo ${this.MAX_LENGTH} caracteres`);
      return false;
    }

    if (!this.alphanumericRegex.test(text)) {
      this.errorSubject.next('Solo puedes usar letras, números y espacios 😊');
      return false;
    }

    return true;
  }

  /** --------------------------------------------------------------
   *   @method start
   *   @public
   *   @description Inicia el proceso de reconocimiento de voz
   * ---------------------------------------------------------------
   */
  start(): void {
    if (!this.recognition) return;

    if (this.listeningSubject.value) {
      console.warn('🟡 Ya se está escuchando');
      return;
    }

    try {
      this.textSubject.next('');
      this.errorSubject.next('');
      this.recognition.start();
    } catch (err: any) {
      if (err.name === 'InvalidStateError') {
        console.log('El sistema se reinició, hablemos de nuevo 🎙️');
        this.isRestarting = true;
        this.recognition.stop();
      } else {
        console.error(
          'Parece que algo falló al activar el micrófono. Intenta reiniciar:',
          err
        );
      }
    }
  }

  /** --------------------------------------------------------------
   *   @method stop
   *   @public
   *   @description Detiene el proceso de reconocimiento de voz
   * ---------------------------------------------------------------
   */
  stop(): void {
    if (this.recognition && this.listeningSubject.value) {
      this.recognition.stop();
    }
  }

  /** --------------------------------------------------------------
   *   @method reset
   *   @public
   *   @description Restablece el texto reconocido
   * ---------------------------------------------------------------
   */
  reset(): void {
    this.textSubject.next('');
    this.errorSubject.next('');
  }

  /** --------------------------------------------------------------
   *   @method isSupported
   *   @public
   *   @description Comprueba si el navegador es compatible
   *   @returns {boolean} true si el navegador soporta la Web `false` si no lo hace
   *  ---------------------------------------------------------------
   */
  isSupported(): boolean {
    return typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition)
      ? true
      : false;
  }
}

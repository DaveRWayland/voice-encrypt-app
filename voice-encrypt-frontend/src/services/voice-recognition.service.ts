/**
 * -------------- 🎙️ VOICE RECOGNITION SERVICE -------------
 *
 *  Servicio de reconocimiento de voz utilizando la API Web Speech
 *  y convertirla en texto.
 *
 *  - Alfanumerico
 *  - Menor a 15 caracteres
 * ----------------------------------------------------------
 * */

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

/**
 * ------------- CLASS VOICE RECOGNITION SERVICE -------------
 *
 * @class VoiceRecognitionService
 * @attributes
 *   - recognition: instancia de la API de reconocimiento de voz
 *   - textSubject: BehaviorSubject para el texto reconocido
 *   - listeningSubject: BehaviorSubject para el estado de escucha
 *   - errorSubject: BehaviorSubject para errores
 * @events
 *   - onresult: obtiene el resultado del reconocimiento
 *   - onstart: comienza a escuchar
 *   - onend: termina de escuchar
 *   - onerror: maneja errores
 * @methods
 *   - start: inicia el reconocimiento de voz
 *   - stop: detiene el reconocimiento de voz
 *   - reset: resetea el texto y los errores
 *   - cleanText: limpia el texto removiendo espacios y caracteres no deseados
 *   - validateText: valida que el texto cumpla con los requisitos
 * @observables
 *   - text: observable del texto reconocido
 *   - listening: observable del estado de escucha
 *   - error: observable de errores
 * @uses Web Speech API
 * @description Servicio para el reconocimiento de voz.
 *
 * -----------------------------------------------------------
 */
export class VoiceRecognitionService {
  // Instancia del recognition
  private recognition: any;

  //Observer para el texto
  private textSubject = new BehaviorSubject<string>('');
  public text: Observable<string> = this.textSubject.asObservable();

  //Observer para listen state
  private listeningSubject = new BehaviorSubject<boolean>(false);
  public listening: Observable<boolean> = this.listeningSubject.asObservable();

  //Observer para errores
  private errorSubject = new BehaviorSubject<string>('');
  public error: Observable<string> = this.errorSubject.asObservable();

  private alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
  private MAX_LENGTH = 15;

  constructor() {
    this.initRecognition();
  }

  /**
   * ------------------ INIT RECOGNITION -----------------
   *
   * @private
   * @method initRecognition
   * @description Inicializa la instancia de SpeechRecognition
   * y configura sus eventos.
   *
   * --------------------------------------------------------
   */
  private initRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      window.alert(
        'Ups... tu navegador aún no sabe escuchar. ¡Intenta con otro! 🎧'
      );
      this.errorSubject.next(
        'Ups... tu navegador aún no sabe escuchar. ¡Intenta con otro! 🎧'
      );
      return;
    }

    this.recognition = new SpeechRecognition();

    // CONFIG:  Configuracion del Recognition

    this.recognition.lang = 'es-MX';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;

    // EVENT:  Cuando se obtenienen resultados
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

    // EVENT: Comienza a escuchar
    this.recognition.onstart = () => {
      console.log('🎤 Voice Recognition Init');
      this.listeningSubject.next(true);
      this.errorSubject.next('');
    };

    // EVENT: Termina de escuchar
    this.recognition.onend = () => {
      console.log('🔇 Voice Recognition End');
      this.listeningSubject.next(false);
    };

    // EVENT: Error
    this.recognition.onerror = (event: any) => {
      console.error('❌ Error en reconocimiento de voz:', event.error);

      let errorMessage = '';
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'Eh? Mas fuerte no te escucho. 🤔';
          break;
        case 'audio-capture':
          errorMessage =
            '🚀 Micrófono no encontrado. Conéctalo y activa tu voz.';
          break;
        case 'not-allowed':
          errorMessage =
            'Tu micrófono se negó a cooperar. Dale acceso para escucharte.';
          break;
        default:
          errorMessage = `Error: ${event.error}`;
      }

      this.errorSubject.next(errorMessage);
      this.listeningSubject.next(false);
    };
  }

  /**
   * Limpia el texto removiendo espacios y caracteres no deseados
   */
  private cleanText(text: string): string {
    return text
      .trim()
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9]/g, '');
  }

  /* ------------------- VALIDATION ------------------ */

  private validateText(text: string): boolean {
    /**
     * -------------------- VALIDATE TEXT --------------------
     *
     * @private
     * @method validateText
     * @description Valida que el texto cumpla con los
     * requisitos de longitud y formato alfanumérico.
     * @param text El texto a validar.
     * --------------------------------------------------------
     */

    //LONGITUD
    if (text.length > this.MAX_LENGTH) {
      this.errorSubject.next(`¡Uy! Solo caben 15 caracteres 😅`);
      return false;
    }

    //ALFANUMERICO
    if (!this.alphanumericRegex.test(text)) {
      this.errorSubject.next('Hey, solo letras. Nada de símbolos raros 😅');
      return false;
    }
    return true;
  }

  /** ----------------- START RECOGNITION ----------------
   *
   *  @method start
   *  @returns void
   *  @description:Inicia el reconocimiento de voz
   *  1. Limpia el texto previo
   *  2. Limpia errores previos
   *  3. Inicia el recognition
   * --------------------------------------------------------
   */

  start(): void {
    if (this.recognition) {
      this.textSubject.next(''); // Limpia el texto anterior
      this.errorSubject.next('');
      this.recognition.start();
    }
  }

  /**
   * ------------------ STOP RECOGNITION -----------------
   *
   *  @method stop
   *  @returns void
   *  @description: Detiene el reconocimiento de voz
   * --------------------------------------------------------
   */

  stop(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  /**
   * ------------------ RESET RECOGNITION -----------------
   *
   *  @method reset
   *  @returns void
   *  @description: Resetea el texto y errores
   *
   * --------------------------------------------------------
   */

  reset(): void {
    this.textSubject.next('');
    this.errorSubject.next('');
  }
}

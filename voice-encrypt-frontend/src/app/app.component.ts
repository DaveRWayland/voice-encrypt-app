/** ------------------ 🎤 VOICE RECOGNITION COMPONENT --------------------
 *
 * Componente principal de la app.
 * Utiliza servicios para reconocimiento de voz y encriptación.
 * Maneja UI y estados.
 *
 * ----------------------------------------------------------------------------
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { VoiceRecognitionService } from '../services/voice-recognition.service';
import { EncryptionService } from '../services/encryption.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
})

/**
 * ------------------ 🎤 APP COMPONENT CLASS -------------------
 *
 *   Maneja la UI y estados de la aplicación
 *   Utiliza servicios para reconocimiento de voz y encriptación
 *
 *   @property {Subject<void>} destroy$ - Maneja las desuscripciones
 *   @property {string} recognizedText - Texto reconocido por voz
 *   @property {string} encryptedText - Texto encriptado
 *   @property {string} decryptedText - Texto desencriptado
 *   @property {boolean} isListening - Estado del micrófono si esta activado
 *   @property {boolean} isProcessing - Indica si hay una operación en curso
 *   @property {boolean} showSuccess - Indica si mostrar mensaje de éxito
 *   @property {boolean} showDecrypted - Indica si mostrar texto desencriptado
 *   @property {boolean} isSpeechSupported - Indica si el navegador soporta el reconocimiento de voz
 *   @property {Array} particles - Configuración para partículas animadas en el fondo
 *   @property {string} error - Mensajes de error
 *
 * -----------------------------------------------------------
 */
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  recognizedText: string = '';
  encryptedText: string = '';
  decryptedText: string = '';
  isListening: boolean = false;
  error: string = '';
  isProcessing: boolean = false;
  showSuccess: boolean = false;
  showDecrypted: boolean = false;
  isSpeechSupported: boolean = false;
  particles = Array.from({ length: 30 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 10 + Math.random() * 10,
  }));

  /**
   * ---------------------- 🔨 CONSTRUCTOR -----------------------
   */
  constructor(
    private voiceService: VoiceRecognitionService,
    private encryptionService: EncryptionService
  ) {}

  /**
   * ---------------------- 🎬 ON INIT ----------------------
   *  Inicializa el componente
   *  @returns {void}
   * -------------------------------------------------------
   */
  ngOnInit(): void {
    this.isSpeechSupported = this.voiceService.isSupported();

    if (!this.isSpeechSupported) {
      this.error =
        'Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.';
      return;
    }

    /**
     * -------------- 🔔 SUBSCRIPCIONES A SERVICIOS --------------
     *  Maneja actualizaciones de texto, estado del micrófono y errores
     *  @returns {void}
     * -----------------------------------------------------------
     */

    this.voiceService.text$.pipe(takeUntil(this.destroy$)).subscribe((text) => {
      this.recognizedText = text;
      this.showSuccess = false;
      this.showDecrypted = false;
    });

    this.voiceService.listening$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        // Sincroniza UI con el estado real del micro
        if (state !== this.isListening) {
          this.isListening = state;
        }
      });

    this.voiceService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((err) => (this.error = err));
  }

  /** ---------------------- 🧹 ON DESTROY ----------------------
   *  Limpia suscripciones y detiene reconocimiento si es necesario
   *  @returns {void}
   * --------------------------------------------------------
   */

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.isListening) {
      this.voiceService.stop();
    }
  }

  /** --------------------------------------------------------------
   *   @method toggleVoiceRecognition
   *   @public
   *   @description Activa o desactiva el reconocimiento de voz
   * ---------------------------------------------------------------
   */
  toggleVoiceRecognition(): void {
    if (!this.isSpeechSupported) return;

    if (this.isListening) {
      this.isListening = false; // Cambia UI al instante
      this.voiceService.stop();
    } else {
      this.isListening = true; // Cambia UI al instante
      this.voiceService.start();
    }
  }

  /**
   * --------------------------------------------------------------
   *  @method encryptText
   *  @public
   *  @description Encripta el texto usando el servicio de encriptacion
   *  @returns {void}
   * ---------------------------------------------------------------
   */
  encryptText(): void {
    if (!this.recognizedText || this.isProcessing) return;

    this.isProcessing = true;
    this.error = '';
    this.showSuccess = false;
    this.showDecrypted = false;

    this.encryptionService
      .encrypt(this.recognizedText)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.encryptedText = res.encryptedText;
          this.isProcessing = false;
          this.showSuccess = true;

          setTimeout(() => (this.showSuccess = false), 3000);
        },
        error: (err) => {
          this.error = err.message;
          this.isProcessing = false;
        },
      });
  }

  /** --------------------------------------------------------------
   *  @method decryptText
   *  @public
   *  @description Desencripta el texto usando el servicio
   *  @returns {void}
   * ---------------------------------------------------------------
   */
  decryptText(): void {
    if (!this.encryptedText || this.isProcessing) return;

    this.isProcessing = true;
    this.error = '';

    this.encryptionService
      .decrypt(this.encryptedText)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.decryptedText = res.decryptedText;
          this.isProcessing = false;
          this.showDecrypted = true;
        },
        error: (err) => {
          this.error = err.message;
          this.isProcessing = false;
        },
      });
  }
  /** --------------------------------------------------------------
   *  @method reset
   *  @public
   *  @description Restablece todos los estados y textos
   * ---------------------------------------------------------------
   */

  reset(): void {
    this.voiceService.reset();
    this.recognizedText = '';
    this.encryptedText = '';
    this.decryptedText = '';
    this.error = '';
    this.showSuccess = false;
    this.showDecrypted = false;

    if (this.isListening) {
      this.isListening = false;
      this.voiceService.stop();
    }
  }
  /** --------------------------------------------------------------
   *  @method copyToClipboard
   *  @public
   *  @description Copia el texto al portapapeles
   *  @param {string} text - El texto a copiar
   * ---------------------------------------------------------------
   */

  copyToClipboard(text: string): void {
    navigator.clipboard
      .writeText(text)
      .then(() => console.log('✅ Texto copiado'))
      .catch((err) => console.error('❌ Error al copiar:', err));
  }
}

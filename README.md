# 🎙️ Encrypt Voice App

[
🔒 Encriptación RSA-2048](#) • [🎤 Reconocimiento de voz](#) • [🔐 Encriptación segura](#) • [🎨 UX | UI](#) • [🛡️ Validación alfanumérica](#) • [🐳 Docker](#)

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Angular](https://img.shields.io/badge/Angular-17-red?logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-blue?logo=docker)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Repo](https://img.shields.io/badge/GitHub-Repo-black?logo=github)](https://github.com/DaveRWayland/voice-encrypt-app.git)

## 📋 Tabla de Contenidos

- [🎙️ Encrypt Voice App](#️-encrypt-voice-app)
  - [📋 Tabla de Contenidos](#-tabla-de-contenidos)
  - [🌟 Características Principales](#-características-principales)
  - [🛠️ Stack Tecnológico](#️-stack-tecnológico)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [DevOps](#devops)
  - [📋 Requisitos del Sistema](#-requisitos-del-sistema)
  - [🚀 Instalación y Configuración](#-instalación-y-configuración)
    - [1️⃣ Backend Setup](#1️⃣-backend-setup)
    - [2️⃣ Frontend Setup](#2️⃣-frontend-setup)
  - [🔑 Generación de Llaves RSA](#-generación-de-llaves-rsa)
  - [📂 Arquitectura del Proyecto](#-arquitectura-del-proyecto)
  - [📊 Flujo de Datos](#-flujo-de-datos)
  - [🔐 Sistema de Encriptación RSA](#-sistema-de-encriptación-rsa)
  - [📡 API REST Endpoints](#-api-rest-endpoints)
    - [🏠 GET `/`](#-get-)
    - [🔒 POST `/api/encrypt`](#-post-apiencrypt)
    - [🔓 POST `/api/decrypt`](#-post-apidecrypt)
  - [🎨 Documentación del Frontend](#-documentación-del-frontend)
    - [Servicios](#servicios)
      - [🎤 VoiceRecognitionService](#-voicerecognitionservice)
      - [🌐 EncryptionService](#-encryptionservice)
    - [Componentes](#componentes)
      - [🧩 AppComponent](#-appcomponent)
  - [🔧 Documentación del Backend](#-documentación-del-backend)
    - [Servicios](#servicios-1)
      - [🔐 EncryptionService](#-encryptionservice-1)
    - [Controladores](#controladores)
      - [🎮 EncryptionController](#-encryptioncontroller)
  - [📑 Funciones, Métodos y Eventos](#-funciones-métodos-y-eventos)
  - [🐳 Despliegue con Docker](#-despliegue-con-docker)
  - [🧪 Testing](#-testing)
  - [🤝 Contribuciones](#-contribuciones)
  - [📄 Licencia](#-licencia)

---

## 🌟 Características Principales

- Reconocimiento de voz en tiempo real (Web Speech API)
- Encriptación RSA-2048 con PKCS1Padding y Base64
- Validación instantánea de caracteres alfanuméricos (máx. 15)
- Interfaz moderna, dark theme, animaciones y responsive
- Pruebas unitarias con Jest y Jasmine
- Documentación JSDoc y robusto manejo de errores

---

## 🛠️ Stack Tecnológico

### Backend

| Tecnología | Versión | Propósito                     |
| ---------- | ------- | ----------------------------- |
| Node.js    | 18.x    | Runtime JavaScript            |
| Express    | 4.18.x  | Framework web                 |
| TypeScript | 5.x     | Tipado estático               |
| node-rsa   | 1.1.1   | Encriptación RSA              |
| CORS       | 2.8.5   | Cross-Origin Resource Sharing |
| Jest       | 29.x    | Testing framework             |
| ts-node    | 10.x    | Ejecutor TypeScript           |
| nodemon    | 3.x     | Auto-reload en desarrollo     |

### Frontend

| Tecnología     | Versión | Propósito             |
| -------------- | ------- | --------------------- |
| Angular        | 17      | Framework SPA         |
| TypeScript     | 5.x     | Tipado estático       |
| RxJS           | 7.x     | Programación reactiva |
| SCSS           | -       | Preprocesador CSS     |
| Web Speech API | -       | Reconocimiento de voz |
| HttpClient     | -       | Peticiones HTTP       |
| Jasmine        | 5.x     | Testing framework     |
| Karma          | 6.x     | Test runner           |

### DevOps

- Docker, docker-compose
- Nginx para frontend

---

## 📋 Requisitos del Sistema

- Node.js 18.x
- Angular CLI 17.x
- Navegador compatible con Web Speech API (Chrome recomendado)
- Docker (opcional)

---

## 🚀 Instalación y Configuración

### 1️⃣ Backend Setup

```bash
cd voice-encrypt-backend
npm install
npm run generate-keys
npm run dev
```

- Llaves RSA generadas en `voice-encrypt-backend/keys`
- Servidor en `http://localhost:3000`

### 2️⃣ Frontend Setup

```bash
cd voice-encrypt-frontend
npm install
ng serve --open
```

- App en `http://localhost:4200`

---

## 🔑 Generación de Llaves RSA

Para generar las llaves RSA-2048 necesarias para la encriptación y desencriptación, ejecuta:

```bash
npm run generate-keys
```

Esto crea los archivos `public.key` y `private.key` en la carpeta `voice-encrypt-backend/keys/`.

---

## 📂 Arquitectura del Proyecto

```
voice-encrypt-app/
│
├── voice-encrypt-backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── generateKeys.ts
│   │   ├── controllers/
│   │   │   └── encryptionController.ts
│   │   ├── routes/
│   │   │   └── encryptionRoutes.ts
│   │   ├── services/
│   │   │   └── encryptionService.ts
│   │   └── server.ts
│   ├── keys/
│   │   ├── public.key
│   │   └── private.key
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── voice-encrypt-frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/
│   │   │   │   ├── voice-recognition.service.ts
│   │   │   │   ├── encryption.service.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   ├── app.component.scss
│   ├── package.json
│   ├── angular.json
│   ├── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## 📊 Flujo de Datos

```
Usuario (habla)
   ↓
Web Speech API (navegador)
   ↓
VoiceRecognitionService (frontend)
   ↓
AppComponent (frontend)
   ↓
EncryptionService (frontend)
   ↓
Backend API (POST /api/encrypt)
   ↓
EncryptionService (backend)
   ↓
Respuesta: { encryptedText: "..." }
   ↓
AppComponent muestra resultado
```

---

## 🔐 Sistema de Encriptación RSA

| Parámetro       | Valor        | Descripción           |
| --------------- | ------------ | --------------------- |
| Algoritmo       | RSA          | Rivest-Shamir-Adleman |
| Tamaño de llave | 2048 bits    | Alta seguridad        |
| Esquema         | PKCS1Padding | RSA/ECB/PKCS1Padding  |
| Encoding        | UTF-8        | Codificación de texto |
| Salida          | Base64       | Formato de transporte |

---

## 📡 API REST Endpoints

### 🏠 GET `/`

Verifica que el servidor está funcionando.

**Respuesta:**

```json
{
	"message": "🚀 API de Encriptación RSA funcionando correctamente",
	"endpoints": {
		"encrypt": "POST /api/encrypt",
		"decrypt": "POST /api/decrypt"
	}
}
```

### 🔒 POST `/api/encrypt`

Encripta texto usando la llave pública RSA.

**Body:**

```json
{ "text": "Juan123" }
```

**Validaciones:**

- No vacío, solo alfanuméricos, máx. 15 caracteres, tipo string

**Respuesta exitosa:**

```json
{
	"success": true,
	"originalText": "Juan123",
	"encryptedText": "mQ7K8vF3xN2pL9sT...",
	"message": "Texto encriptado exitosamente"
}
```

**Errores:**

- 400: campo faltante o inválido
- 500: error interno

### 🔓 POST `/api/decrypt`

Desencripta texto usando la llave privada RSA.

**Body:**

```json
{ "encryptedText": "mQ7K8vF3xN2pL9sT..." }
```

**Respuesta exitosa:**

```json
{
	"success": true,
	"encryptedText": "mQ7K8vF3xN2pL9sT...",
	"decryptedText": "Juan123",
	"message": "Texto desencriptado exitosamente"
}
```

**Errores:**

- 400: campo faltante o inválido
- 500: error interno

---

## 🎨 Documentación del Frontend

### Servicios

#### 🎤 VoiceRecognitionService

- Reconocimiento de voz en tiempo real.
- Validación de texto alfanumérico y longitud.
- Observables para texto, estado de escucha y errores.
- Métodos: `start()`, `stop()`, `reset()`, `isSupported()`

#### 🌐 EncryptionService

- Peticiones HTTP al backend para encriptar/desencriptar.
- Interfaces: `EncryptResponse`, `DecryptResponse`, `ApiError`
- Métodos: `encrypt(text)`, `decrypt(encryptedText)`

### Componentes

#### 🧩 AppComponent

- Propiedades: `recognizedText`, `encryptedText`, `decryptedText`, `isProcessing`, `showSuccess`, `showDecrypted`, `isSpeechSupported`
- Métodos: `encryptText()`, `decryptText()`, `reset()`
- Ciclo de vida: suscripción a observables, manejo de memoria

---

## 🔧 Documentación del Backend

### Servicios

#### 🔐 EncryptionService

- Encriptación y desencriptación RSA-2048.
- Métodos: `encrypt(text)`, `decrypt(encrypted)`, `getPublicKey()`

### Controladores

#### 🎮 EncryptionController

- Endpoints: `/api/encrypt`, `/api/decrypt`
- Validación de datos y manejo de errores

---

## 📑 Funciones, Métodos y Eventos

| Nombre                           | Parámetros                         | Tipo Parámetro              | Retorno                     | Descripción                             |
| -------------------------------- | ---------------------------------- | --------------------------- | --------------------------- | --------------------------------------- |
| **VoiceRecognitionService**      |                                    |                             |                             |                                         |
| start()                          | -                                  | -                           | void                        | Inicia reconocimiento de voz            |
| stop()                           | -                                  | -                           | void                        | Detiene reconocimiento de voz           |
| reset()                          | -                                  | -                           | void                        | Limpia el estado interno                |
| isSupported()                    | -                                  | -                           | boolean                     | Verifica soporte de SpeechRecognition   |
| text$                            | -                                  | -                           | Observable<string>          | Texto reconocido                        |
| listening$                       | -                                  | -                           | Observable<boolean>         | Estado de escucha                       |
| error$                           | -                                  | -                           | Observable<string>          | Mensaje de error                        |
| **EncryptionService (frontend)** |                                    |                             |                             |                                         |
| encrypt(text)                    | text: string                       | string                      | Observable<EncryptResponse> | Encripta texto vía API                  |
| decrypt(encryptedText)           | encryptedText: string              | string                      | Observable<DecryptResponse> | Desencripta texto vía API               |
| **EncryptionService (backend)**  |                                    |                             |                             |                                         |
| encrypt(text)                    | text: string                       | string                      | string                      | Encripta texto con llave pública        |
| decrypt(encrypted)               | encrypted: string                  | string                      | string                      | Desencripta texto con llave privada     |
| getPublicKey()                   | -                                  | -                           | string                      | Retorna la llave pública en formato PEM |
| **AppComponent**                 |                                    |                             |                             |                                         |
| encryptText()                    | -                                  | -                           | void                        | Encripta el texto reconocido            |
| decryptText()                    | -                                  | -                           | void                        | Desencripta el texto encriptado         |
| reset()                          | -                                  | -                           | void                        | Reinicia los estados y servicios        |
| ngOnInit()                       | -                                  | -                           | void                        | Inicializa el componente                |
| ngOnDestroy()                    | -                                  | -                           | void                        | Limpia suscripciones y estados          |
| **Eventos**                      |                                    |                             |                             |                                         |
| onresult (SpeechRecognition)     | event: SpeechRecognitionEvent      | SpeechRecognitionEvent      | void                        | Evento de resultado de voz              |
| onerror (SpeechRecognition)      | event: SpeechRecognitionErrorEvent | SpeechRecognitionErrorEvent | void                        | Evento de error en reconocimiento       |

---

## 🐳 Despliegue con Docker

- Backend y frontend tienen Dockerfile.
- Usa `docker-compose.yml` para levantar ambos servicios.
- Nginx sirve frontend en producción.

```bash
docker-compose up --build
```

---

## 🧪 Testing

- Backend: Jest (`npm run test`)
- Frontend: Jasmine/Karma (`ng test`)
- Pruebas unitarias para servicios y componentes.

---

## 🤝 Contribuciones

By **David Raygoza**  
[GitHub](https://github.com/DaveRWayland)

---

## 📄 Licencia

MIT

---

> **Para detalles de cada archivo, consulta la documentación inline y los comentarios JSDoc en el código fuente.**

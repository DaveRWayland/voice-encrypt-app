/** ----------------- 📡 SERVIDOR PRINCIPAL -----------------
 *
 *  Configuración y arranque del servidor Express.
 *  Se inicializan los middlewares y el servidor HTTP principal.
 *
 * -----------------------------------------------------------
 */

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "./routes/routes";
import { decrypt } from "dotenv";
import e from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, _res: Response, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
	next();
});

app.use("/api", routes);

/* ------------------- RUTA DE PRUEBA ------------------- */

app.get("/", (req: Request, res: Response) => {
	res.json({
		message: "API is running",
		endpoints: {
			encrypt: "POST /api/encrypt",
			decrypt: "POST /api/decrypt",
		},
	});
});

/* ----------- MANEJO DE RUTAS NO ENCONTRADAS ----------- */
app.use((req: Request, res: Response) => {
	res.status(404).json({ success: false, error: "Route not found" });
});

/* ----------------- INICIA EL SERVIDOR ----------------- */
app.listen(PORT, () => {
	console.log(`
    ╔════════════════════════════════════════╗
    ║   🚀 Servidor iniciado exitosamente   ║
    ║   📡 Puerto: ${PORT}                      ║
    ║   🌐 URL: http://localhost:${PORT}       ║
    ╚════════════════════════════════════════╝
  `);
});

export default app;

import cors from "cors";
import { createServer } from "http";
import { authRoute, userRoute } from "./routes";
import { config} from "./config";

const corsMiddleware = cors();

// TODO: Importa express, morgan, cors y el router desde routes.js

// TODO: Crea la aplicación con express()

// TODO: Configura middlewares:
// - cors (permitir origen http://localhost:5173 con credenciales)
// - express.json() para parsear JSON
// - morgan en modo 'dev' para logs

// TODO: Usa el router bajo la ruta '/api'

// TODO: Define el puerto (usar process.env.PORT o 4000)

// TODO: Inicia el servidor y muestra un mensaje en consola con la URL

const server = createServer(async (req, res) => {
    corsMiddleware(req, res, async () => {
        res.setHeader("Content-Type", "application/json");

        try {
      if (req.url?.startsWith("/api/auth")) {
        await authRoute(req, res);
      } else if (req.url?.startsWith("/api/users")) {
        await userRoute(req, res);
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Not Found" }));
      }
    } catch (_err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
    })
})

server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`)
})
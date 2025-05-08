import express from "express";
import dotenv from "dotenv";
import cors from "cors"

// Middlewares
import errorHandler  from "./middlewares/errorHandler";

// Rotas
import routes from "./routes/routes";

dotenv.config();

const App = express();

App.use(cors())
App.use(express.json());
App.use("/api", routes);
App.use(errorHandler);

const port = 8080;

App.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});

import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Routes } from "../routes/routes";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

class Server {
  public app: express.Express;
  public port = Number(process.env.PORT) || 7777;

  constructor() {
    this.port;
    this.app = express();
    this.config();
    this.routes();
  }

  public config(): void {
    this.app.use(cors());
    this.app.use(function (_, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization, Accept",
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, PUT, POST, DELETE, HEAD, OPTIONS",
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  public routes(): void {
    this.app.use("/.netlify/functions/server", new Routes().router);
    this.app.get("/", (_, res) => res.send("Invalid endpoint"));
  }

  public start(): void {
    this.config();
    this.routes();
    this.app.listen(this.port, () =>
      console.info(`Server running on port ${this.port}`),
    );
  }
}

export const app = new Server().app;

import express from "express";
import conn from "./db.js";
import dotenv from "dotenv";
import route from "./route.js"
import corsOptions from "./helpers/corsOptions.js";
import cors from "cors"
import MethodOverride from "method-override";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express"
import { readFile } from 'node:fs/promises';

const app = express();
dotenv.config();
conn();

//ejs template engine 
app.use(express.static("public"))

//swagger
const fileUrl = new URL("./swagger.json", import.meta.url);
const swaggerDoc = JSON.parse(await readFile(fileUrl, 'utf8'));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

//static files middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}))

app.use(cors(corsOptions))
route(app);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Baglandı",process.env.PORT);
});

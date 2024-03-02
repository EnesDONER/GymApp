import express from "express";
import conn from "./db.js";
import dotenv from "dotenv";
import route from "./route.js"
import corsOptions from "./helpers/corsOptions.js";
import cors from "cors"
import MethodOverride from "method-override";
import { Server } from "socket.io";

const app = express();
dotenv.config();
conn();

//ejs template engine 
app.use(express.static("public"))


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

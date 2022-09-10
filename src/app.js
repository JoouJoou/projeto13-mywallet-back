import express from "express";
import cors from "cors";
import authRouter from "./Routers/authRouter.js";
import opRouter from "./Routers/opRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(opRouter);

app.listen(5000, () => {
  console.log("Listen on 5000");
});

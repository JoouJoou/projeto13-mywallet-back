import express from "express";
import cors from "cors";
import authRouter from "./Routers/authRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);

app.listen(5000, () => {
  console.log("Listen on 5000");
});

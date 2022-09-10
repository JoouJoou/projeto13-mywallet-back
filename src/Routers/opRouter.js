import { Router } from "express";
import { transactions } from "../controllers/transactionsController.js";
import { validateToken } from "../Middlewares/validateToken.js";

const router = Router();

router.get("/transactions", validateToken, transactions);

export default router;

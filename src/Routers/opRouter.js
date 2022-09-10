import { Router } from "express";
import {
  makeTransactions,
  takeTransactions,
} from "../controllers/transactionsController.js";
import { validateToken } from "../Middlewares/validateToken.js";
import { validateSchema } from "../Middlewares/validateSchema.js";
import { transactionsSchemas } from "../Schemas/opSchemas.js";

const router = Router();

router.get("/transactions", validateToken, takeTransactions);

router.post(
  "/transactions",
  validateToken,
  validateSchema(transactionsSchemas),
  makeTransactions
);

export default router;

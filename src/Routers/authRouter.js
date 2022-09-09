import { signup, login } from "../controllers/authController.js";
import { Router } from "express";
import { validateSchema } from "../Middlewares/validateSchema.js";
import { signupSchema, loginSchema } from "../Schemas/authSchemas.js";
import { validateToken } from "../Middlewares/validateToken.js";
import { balance } from "../controllers/transactionsController.js";

const router = Router();

router.post("/signup", validateSchema(signupSchema), signup);

router.post("/login", validateSchema(loginSchema), login);

router.get("/balance", validateToken, balance);

export default router;

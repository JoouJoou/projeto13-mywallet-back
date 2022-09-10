import { signup, login } from "../controllers/authController.js";
import { Router } from "express";
import { validateSchema } from "../Middlewares/validateSchema.js";
import { signupSchema, loginSchema } from "../Schemas/authSchemas.js";

const router = Router();

router.post("/signup", validateSchema(signupSchema), signup);

router.post("/login", validateSchema(loginSchema), login);

export default router;

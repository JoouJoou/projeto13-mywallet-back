import express from "express";
import cors from "cors";
import joi from "joi";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email(),
    password: joi.string().required().min(5)
})

const loginSchema = joi.object({
    email: joi.string().email(),
    password:joi.string().required().min(5)
})

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect().then(() => {
    db = mongoClient.db("mywallet")
}).catch((e) => {
    console.log(e)
})

app.post("/signup", async (req, res) => {
    try {
        const validation = signupSchema.validate(req.body, { abortEarly: true })
        if (validation.error) {
            res.status(422).send(`${validation.error}`)
            return
        }
        
        const checkEmail = await db.collection("users").findOne({email: req.body.email})
        if (checkEmail) {
            res.status(409).send("Usuário já cadastrado")
            return
        }
        const user = req.body
        const passwordHash = bcrypt.hashSync(user.password, 10)
        await db.collection("users").insertOne({...user, password: passwordHash, balance: 0.00})
        res.sendStatus(201)
        return
    } catch {
        res.sendStatus(500)
        return
    }
})

app.post("/login", async (req, res) => {
    try {
        const validation = loginSchema.validate(req.body, { abortEarly: true })
        if (validation.error) {
            res.status(422).send(`${validation.error.details}`)
            return
        }
        const { email, password } = req.body;
        const user = await db.collection("users").findOne({email})
        if (user && bcrypt.compareSync(password, user.password)) {
            res.sendStatus(200)
            return
        }
        else {
            res.sendStatus(404)
            return
        }
    } catch {
        res.sendStatus(500)
        return
    }
})

app.listen(5000, () => {console.log("Listen on 5000")});
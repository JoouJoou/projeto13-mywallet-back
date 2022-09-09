import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/db.js";

export async function signup(req, res) {
  try {
    const checkEmail = await db
      .collection("users")
      .findOne({ email: req.body.email });
    if (checkEmail) {
      res.status(409).send("Usuário já cadastrado");
      return;
    }
    const user = req.body;
    const passwordHash = bcrypt.hashSync(user.password, 10);
    await db
      .collection("users")
      .insertOne({ ...user, password: passwordHash, balance: 0 });
    res.sendStatus(201);
    return;
  } catch {
    res.sendStatus(500);
    return;
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await db.collection("users").findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({ id: email, token: token });
      res.status(200).send(token);
      console.log(token);
      return;
    } else {
      res.sendStatus(404);
      return;
    }
  } catch {
    res.sendStatus(500);
    return;
  }
}

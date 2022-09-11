import { db } from "../database/db.js";
import dayjs from "dayjs";

export async function takeTransactions(req, res) {
  try {
    const { id } = req.headers;
    console.log(id);
    const transfers = await db.collection("balance").find({ id: id }).toArray();
    if (!transfers) {
      res.sendStatus(400);
      return;
    }
    res.status(200).send(transfers);
    return;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    return;
  }
}

export async function makeTransactions(req, res) {
  try {
    const date = dayjs(new Date()).format("DD/MM");
    const user = await db.collection("users").findOne({ email: req.body.id });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    let balance;
    if (req.body.type === "in") {
      balance = Number(user.balance) + Number(req.body.value);
    }
    if (req.body.type === "out") {
      balance = Number(user.balance) - Number(req.body.value);
    }
    await db
      .collection("users")
      .updateOne({ email: req.body.id }, { $set: { balance: balance } });
    await db.collection("balance").insertOne({ ...req.body, date: date });
    res.status(200).json(balance);
    return;
  } catch {
    res.sendStatus(500);
    return;
  }
}

import { db } from "../database/db.js";
import dayjs from "dayjs";

export async function takeTransactions(req, res) {
  try {
    const { id } = req.headers;
    console.log(id);
    const transfers = await db.collection("balance").find({ id: id }).toArray();
    const user = await db.collection("users").findOne({ email: id });
    transfers.push({ balance: user.balance });
    if (!transfers) {
      res.sendStatus(400);
      return;
    }
    res.send(transfers);
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
    if (req.body.type === "in") {
      const user = await db.collection("users").findOne({ email: req.body.id });
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      const balance = (Number(user.balance) + Number(req.body.value)).toFixed(
        2
      );
      await db
        .collection("users")
        .updateOne({ email: req.body.id }, { $set: { balance: balance } });
    }
    if (req.body.type === "out") {
      const user = await db.collection("users").findOne({ email: req.body.id });
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      const balance = (Number(user.balance) - Number(req.body.value)).toFixed(
        2
      );
      await db
        .collection("users")
        .updateOne({ email: req.body.id }, { $set: { balance: balance } });
    }
    await db.collection("balance").insertOne({ ...req.body, date: date });
    res.sendStatus(200);
    return;
  } catch {
    res.sendStatus(500);
    return;
  }
}

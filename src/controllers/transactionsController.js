import { db } from "../database/db.js";

export async function transactions(req, res) {
  try {
    const { id } = req.headers;
    console.log(id);
    const transfers = await db.collection("balance").find({ id: id }).toArray();
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

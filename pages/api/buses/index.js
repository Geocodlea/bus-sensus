import Bus from "/models/Bus";
import dbConnect from "/utils/dbConnect";

export default async function handler(req, res) {
  try {
    await dbConnect();

    const results = await Bus.find();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

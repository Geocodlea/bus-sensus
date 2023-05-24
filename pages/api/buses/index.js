import Bus from "/models/Bus";
import dbConnect from "/utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const results = await Bus.find();

  res.status(200).json(results);
}
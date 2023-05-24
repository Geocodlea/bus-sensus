import Route from "/models/Route";
import dbConnect from "/utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const results = await Route.find({ bus_id: req.query.id });

  res.status(200).json(results);
}

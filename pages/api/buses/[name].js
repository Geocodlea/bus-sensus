import Route from "/models/Route";
import dbConnect from "/utils/dbConnect";

export default async function handler(req, res) {
  try {
    await dbConnect();

    const results = await Route.find({ busName: req.query.name });

    if (!results) {
      return res.status(404).json({ error: "No routes found" });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

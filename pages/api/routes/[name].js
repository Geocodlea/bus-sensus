import Route from "/models/Route";
import dbConnect from "/utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Find the route based on the routeName
    const route = await Route.findOne({ routeName: req.query.name });

    if (!route) {
      throw new Error("Route not found");
    }

    // Find all stations for the route
    const stations = route.stations;

    if (stations.length === 0) {
      throw new Error("No stations found for the route");
    }

    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

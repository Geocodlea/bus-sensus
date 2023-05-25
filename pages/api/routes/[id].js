import Route from "/models/Route";
import Station from "/models/Station";
import RouteStation from "/models/RouteStation";
import dbConnect from "/utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Find the route based on the route_id
    const route = await Route.findOne({ route_id: req.query.id });

    if (!route) {
      throw new Error("Route not found");
    }

    // Find the corresponding route stations using the route_id
    const routeStations = await RouteStation.find({ route_id: req.query.id });

    if (routeStations.length === 0) {
      throw new Error("No stations found for the route");
    }

    // Extract the station_ids from the route stations
    const stationIds = routeStations.map((rs) => rs.station_id);

    // Find the stations based on the station_ids
    const stations = await Station.find({ stationId: { $in: stationIds } });

    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

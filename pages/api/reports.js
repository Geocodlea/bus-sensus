import Report from "/models/Report";
import dbConnect from "/utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  if (method === "GET") {
    const result = await Report.find();

    res.status(200).json(result);
  } else if (method === "POST") {
    const now = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Bucharest",
      hour12: false,
    });

    const report = new Report({
      //  reportId: 1004,
      busId: req.body.busId,
      busName: req.body.busName,
      routeId: req.body.routeId,
      routeName: req.body.routeName,
      stationId: req.body.stationId,
      stationName: req.body.stationName,
      noOfPassengers: req.body.noOfPassengers,
      dateTime: now,
    });
    await report.save();

    res.status(200).json(report);
  }
}

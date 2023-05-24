import mongoose from "mongoose";

global.models = global.models || {};

global.models.Report =
  global.models.Report ||
  mongoose.model("Report", {
    // reportId: { type: Number, unique: true },
    busId: { type: Number, required: true },
    busName: { type: String, required: true },
    routeId: { type: Number, required: true },
    routeName: { type: String, required: true },
    stationId: { type: Number, required: true },
    stationName: { type: String, required: true },
    noOfPassengers: { type: Number, required: true },
    dateTime: { type: String, required: true },
  });

export default global.models.Report;

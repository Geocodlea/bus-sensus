import mongoose from "mongoose";

global.models = global.models || {};

global.models.Station =
  global.models.Station ||
  mongoose.model("Station", {
    stationId: { type: Number, required: true },
    name: { type: String, required: true },
  });

export default global.models.Station;

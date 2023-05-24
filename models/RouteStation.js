import mongoose from "mongoose";

global.models = global.models || {};

global.models.RouteStation =
  global.models.RouteStation ||
  mongoose.model("RouteStation", {
    route_id: { type: Number, required: true },
    station_id: { type: Number, required: true },
  });

export default global.models.RouteStation;

import mongoose from "mongoose";

global.models = global.models || {};

global.models.Route =
  global.models.Route ||
  mongoose.model("Route", {
    route_id: { type: Number, required: true },
    name: { type: String, required: true },
    bus_id: { type: Number, required: true },
  });

export default global.models.Route;

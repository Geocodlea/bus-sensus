import mongoose from "mongoose";

global.models = global.models || {};

global.models.Route =
  global.models.Route ||
  mongoose.model("Route", {
    routeId: { type: Number, required: true },
    busName: { type: String, required: true },
    routeName: { type: String, required: true },
    stations: { type: Array, required: true },
  });

export default global.models.Route;

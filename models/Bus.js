import mongoose from "mongoose";

global.models = global.models || {};

global.models.Bus =
  global.models.Bus ||
  mongoose.model("Bus", {
    busId: { type: Number, required: true },
    name: { type: String, required: true },
  });

export default global.models.Bus;

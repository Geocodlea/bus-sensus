import mongoose from "mongoose";

global.models = global.models || {};
// Define the Report schema
const reportSchema = new mongoose.Schema({
  reportId: { type: Number, unique: true },
  busId: { type: Number, required: true },
  busName: { type: String, required: true },
  routeId: { type: Number, required: true },
  routeName: { type: String, required: true },
  stationId: { type: Number, required: true },
  stationName: { type: String, required: true },
  noOfPassengers: { type: Number, required: true },
  dateTime: { type: String, required: true },
});

// Define a pre-save middleware to autoincrement the reportId
reportSchema.pre("save", async function (next) {
  if (!this.reportId) {
    try {
      const lastReport = await global.models.Report.findOne(
        {},
        {},
        { sort: { reportId: -1 } }
      );
      this.reportId = (lastReport ? lastReport.reportId : 0) + 1;
    } catch (error) {
      return next(error);
    }
  }
  return next();
});

global.models.Report =
  global.models.Report || mongoose.model("Report", reportSchema);

export default global.models.Report;

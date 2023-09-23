const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  time: {
    type: String,
  },
});

const Visitors = mongoose.models.Visitors || mongoose.model("Visitors", VisitorSchema);
module.exports = Visitors;

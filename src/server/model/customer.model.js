const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  machine_number: {
    type: String,
  },
  country: { type: String },
  reigon: { type: String },
  payment_history: {
    type: Array,
  },
  messages: {
    type: Array,
  },
  createdAt: { type: Date },
});

const Customers = mongoose.models.Customers || mongoose.model("Customers", CustomerSchema);
module.exports = Customers;

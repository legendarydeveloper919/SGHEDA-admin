const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  content: {
    type: String,
  },
});

const Messages = mongoose.models.Messages || mongoose.model("Messages", MessageSchema);
module.exports = Messages;

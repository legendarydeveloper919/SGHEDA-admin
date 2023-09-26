const mongoose = require("mongoose");

const ConfigSchema = new mongoose.Schema({
  downloaders: {
    type: Number,
  },
  auto_reply: {
    type: Boolean,
  },
});

const ConfigDatas = mongoose.models.ConfigData || mongoose.model("ConfigData", ConfigSchema);
module.exports = ConfigDatas;

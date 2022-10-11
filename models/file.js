const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    filename: {
      type: String,
    },
    pathname: {
      type: String,
    },
    size: {
      type: Number,
    },
    uuid: {
      type: String,
    },
    sender: {
      type: String,

    },
    receiver: {
      type: String,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("file", fileSchema);

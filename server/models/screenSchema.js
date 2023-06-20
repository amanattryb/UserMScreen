const mongoose = require("mongoose");

const screensSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  customMessage: { type: String},
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  }
});

const Screen = mongoose.model("Screen", screensSchema);
module.exports = Screen;

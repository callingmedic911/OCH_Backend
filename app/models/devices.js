var mongoose= require('mongoose');
var Schema=mongoose.Schema;
var DeviceSchema = new Schema({
  name: String,
  type: String,
  switchBoolean: { type: Boolean, default: false },
  unit: String,
  currentStatus: String,
  targetValue: String,
  suggestedValue: String,
  startSince: Date
});

module.exports = mongoose.model('Device', DeviceSchema);

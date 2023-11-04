const mongoose = require("mongoose")

const Schema = mongoose.Schema;

// Define a schema that accepts anything
const anythingSchema = new Schema({
  anything: Schema.Types.Mixed
}, { timestamps: true });

const AnythingModel = mongoose.model('Anything', anythingSchema);

module.exports = AnythingModel
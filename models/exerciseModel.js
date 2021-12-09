const mongoose = require("mongoose");
const Schema = moongoose.Schema;

const exerciseSchema = new Schema({
    type: String,
    name: String,
    duration: Number, 
    weight: Number,
    reps: Number,
    sets: Number,
})

const exerciseModel = mongoose.model('Exercise', exerciseSchema);

module.exports = exerciseModel;
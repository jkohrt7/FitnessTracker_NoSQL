const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: Date,
    exercises: Array,
})

const workoutModel = mongoose.Model('Workout', workoutSchema);

module.exports = workoutModel;
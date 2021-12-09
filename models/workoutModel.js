const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: Date,
    exercises: [
        {
            type: String,
            name: String,
            duration: Number, 
            weight: Number,
            reps: Number,
            sets: Number,
        }
    ],
})

const workoutModel = mongoose.Model('Workout', workoutSchema);

module.exports = workoutModel;
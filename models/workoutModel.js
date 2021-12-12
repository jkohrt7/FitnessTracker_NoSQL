const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: Date,
    exercises: [
        {
            type: {type: String, required:"Type is a required field"},
            name: {type: String, required:"Name is a required field"},
            duration: Number, 
            weight: Number,
            reps: Number,
            sets: Number,
        }
    ],
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
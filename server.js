const mongoose = require('mongoose');
const Exercise = require('models/exerciseModel.js');
const Workout = require('models/workoutModel.js');

mongoose.connect(provess.env.MONGODB_URI || 'mongodb://localhost/workout'); //TODO
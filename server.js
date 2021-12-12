const express = require("express");   //web framework for building APIs
const logger = require("morgan");     //Middleware for logging http requests to the terminal
const mongoose = require("mongoose"); //Object Document Mapper for mongodb
const path = require("path")

const PORT = process.env.PORT || 3001;

//Import models
const Workout = require('./models/workoutModel.js');

//Prepare express, morgan logger
const app = express();
app.use(logger("dev")); //connect morgan to express app
app.use(express.urlencoded({ extended: true })); //parses incoming requests with urlencoded payloads
app.use(express.json()); //parses incoming requests with JSON payloads
app.use(express.static("public")); //serves static files in the public directory

//Connect to db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

//TODO: separate these into more digestable files 

/* API Routes */
//Need to GET and display last workout.
//Need to have GET reroutes to exercise
//Maybe need to look at how to make the stuff show up idk

//GET last workout
app.get('/api/workouts', (req, res) => {
    console.log(req.originalUrl)
    Workout.find({}).sort({_id:-1}).limit(1)
        .then(lastDocument => {
            res.json(lastDocument);
        })
        .catch(err => {
            res.json(err);
        });
})

//GET specific workout--not actually necessary for the assignment, but useful for debugging.
app.get('/api/workouts/:id', (req, res) => {
    console.log(req.params.id)
    Workout.find({_id: req.params.id})
        .then(requestedWorkout => {
            res.json(requestedWorkout);
        })
        .catch(err => {
            res.json(err);
        });

    //res.send("Put the specific workout as a json here")
})

//PUT a new exercise in a Workout document's 'exercise' array
app.put( '/api/workouts/:id', (req, res) => {
    let newExercise = req.body;
    Workout.findOneAndUpdate({_id: req.params.id}, {$push: {exercises: newExercise}})
        .then(requestedWorkout => {
            res.json(requestedWorkout);
        })
        .catch(err => {
            res.json(err);
    });
})



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});


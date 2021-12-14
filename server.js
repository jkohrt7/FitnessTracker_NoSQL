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

//GET last workout
app.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {$sort: {_id: -1}},
        {$limit: 1},
        {$addFields: {totalDuration: {$sum: "$exercises.duration"}}}
    ])
    .then(lastDocument => {
        res.json(lastDocument);
    })
    .catch(err => {
        res.json(err);
    });
})

//GET all workouts. I have no idea why they called this /range, bc it is not a range of any documents.
app.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {$match: {_id : {$exists: true}}},
        {$addFields: {totalDuration: {$sum: "$exercises.duration"}}}
    ])
    .then(allWorkouts => {
        res.json(allWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
})

//PUT a new exercise in a Workout document's 'exercise' array
app.put('/api/workouts/:id', (req, res) => {
    let newExercise = req.body;
    Workout.findOneAndUpdate({_id: req.params.id}, {$push: {exercises: newExercise}})
    .then(requestedWorkout => {
        res.json(requestedWorkout);
    })
    .catch(err => {
        res.json(err);
    });
})

//CREATE (POST) a new workout.
app.post('/api/workouts', (req, res) => {

    //might need some data checking!
    Workout.create({
        day: new Date(new Date().setDate(new Date().getDate() - 9)),
        exercises: req.data,
    }).then(newWorkout => {
        res.json(newWorkout);
    })
    .catch(err => {
        res.json(err);
    });
})



const router = require("express").Router();
const Mongoose = require("mongoose");
const Workout = require("../models/workout")

router.get("/api/workouts", async (req, res) => {
    // let returnThing = await Workout.find()
    // console.log(returnThing)
    // res.json(returnThing)


    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
})

module.exports = router
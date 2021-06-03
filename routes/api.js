const router = require("express").Router();
const Mongoose = require("mongoose");
const Workout = require("../models/workout")

router.get("/api/workouts", async (req, res) => {
    let returnThing = await Workout.find()
    let returnArr = []
    //There's probably a better way.
    //But I also don't care.
    //All this does is get the cumulative duration of all exercises
    for (const key in returnThing) {
        if (Object.hasOwnProperty.call(returnThing, key)) {
            let totalDuration = 0;
            let element = returnThing[key].toObject();
            const exercises = element.exercises
            exercises.forEach(element => {
                totalDuration += element.duration
            });
            element.totalDuration = totalDuration
            returnArr.push(element)
        }
    }
    res.json(returnArr)
})

//We just blindly create a new workout WHENEVER anyone navigates to the new workout page.
//Why.
//Why would you do that.
router.post("/api/workouts", async (req, res) => {
    res.json(await Workout.create({}))
})

//Find thing by id, add exercise, curse god for letting me live.
//Just blindly sending a body, cause that's cool...
router.put("/api/workouts/:id", async (req, res) => {
    //Well, this should've been easy but I was dumb lol.
    res.json(await Workout.findByIdAndUpdate({ _id: req.params.id },
        { $push: { exercises: req.body } }, { new: true, runValidators: true }))


})

router.get("/api/workouts/range", async (req, res) => {
    let returnThing = await Workout.find()
    let lastSeven = []
    returnArr = []
    for (let index = returnThing.length - 1; index > returnThing.length - 8; index--) {
        const element = returnThing[index];
        lastSeven.push(element)
    }

    //doesn't have to be forin, but I copied this from above.
    for (const key in lastSeven) {
        if (Object.hasOwnProperty.call(lastSeven, key)) {
            let totalDuration = 0;
            //fricking genius right here.
            let element = lastSeven[key].toObject();
            const exercises = element.exercises
            exercises.forEach(element => {
                totalDuration += element.duration
            });
            element.totalDuration = totalDuration
            returnArr.push(element)
        }
    }
    res.json(returnArr)

})

router.delete('/api/workouts', async (req, res) => {
    res.json(await Workout.findByIdAndDelete(req.body.id))

})

module.exports = router
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    date: {
        type: Date,
        //default to today.
        default: Date.now()
    },
    exerciseArray: [
        {
            type: {
                type: String,
                // trim: true,
                required: [true, 'Need exercise type']
            },
            name: {
                type: String,
                // trim: true,
                required: [true, 'Need exercise name']
            },
            weight: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            distance: {
                type: Number,
            },
            duration: {
                type: Number,
                required: [true, 'Need exercise time']
            },

        },
    ],
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;

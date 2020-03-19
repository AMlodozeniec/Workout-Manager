const mongoose = require('mongoose');

const { Schema } = mongoose;

/*
# User
// * Username - Text
// * Password - Text
* Workouts - Array of objects
  - Focus (Strength/Hypertrophy) - Text
  - Exercises - Array of Objects
    - Exercise Name - Text
    - Sets - Number
    - Weight - Number
    - Reps - Number
  - Days - Number
*/

const requiredNumber = {
  type: Number,
  required: true,
};

const workoutEntrySchema = new Schema({
  exercise: {
    name: String,
    set: [{
      id: requiredNumber,
      weight: requiredNumber,
      reps: requiredNumber,
    }],
  },
  // required: true,
}, {
  timestamps: true,
});

const WorkoutEntry = mongoose.model('WorkoutEntry', workoutEntrySchema);

module.exports = WorkoutEntry;

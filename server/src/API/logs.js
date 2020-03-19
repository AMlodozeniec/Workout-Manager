const { Router } = require('express');
const WorkoutEntry = require('../models/WorkoutEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const workouts = await WorkoutEntry.find();
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const workoutEntry = new WorkoutEntry(req.body);
    const createdEntry = await workoutEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;

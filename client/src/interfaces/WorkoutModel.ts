import { Action } from 'easy-peasy';

import Set from './Set';
import Exercise from './Exercise';
import Workout from './Workout';

export default interface WorkoutModel {
  entries: Workout[];
  addWorkout: Action<WorkoutModel, Workout>;
  updateSet: Action<WorkoutModel, { field: string, value: number, exerciseId: string, setNumber: number, workoutId: string }>;
  setEditExerciseIndex: Action<WorkoutModel, { workoutId: string, exerciseId: string, setNumber: number }>;
  setIsAddingNewExercise: Action<WorkoutModel, { id: string, flag: boolean }>;
  setIsAddingNewSet: Action<WorkoutModel, { workoutId: string, exerciseId: string, flag: boolean }>;
  setNewSet: Action<WorkoutModel, { workoutId: string, exerciseId: string, setNumber: number }>;
  addExercise: Action<WorkoutModel, { workoutId: string, exercise: Exercise }>;
  addSet: Action<WorkoutModel, { workoutId: string, set: Set }>;
  deleteSet: Action<WorkoutModel, { workoutId: string, set: Set }>;
}

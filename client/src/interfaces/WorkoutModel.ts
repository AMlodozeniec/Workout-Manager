import { Action, Thunk } from 'easy-peasy';

import Set from './Set';
import Exercise from './Exercise';
import Workout from './Workout';

export default interface WorkoutModel {
  entries: Workout[];
  getEntries: Thunk<WorkoutModel>;
  setEntries: Action<WorkoutModel, Workout[]>;
  addWorkout: Action<WorkoutModel, Workout>;
  createWorkout: Thunk<WorkoutModel, Workout>;
  updateExercise: Action<WorkoutModel, { value: string, exerciseId: string, workoutId: string }>;
  saveUpdateSet: Thunk<WorkoutModel, { weight: number, reps: number, exercise: Exercise, setNumber: number, workoutId: string }>;
  updateSet: Action<WorkoutModel, { weight: number, reps: number, exercise: Exercise, setNumber: number, workoutId: string }>;
  setEditExerciseIndex: Action<WorkoutModel, { workoutId: string, exerciseId: string, setNumber: number }>;
  setIsShowingExercises: Action<WorkoutModel, { workoutId: string, flag: boolean }>;
  setIsAddingNewExercise: Action<WorkoutModel, { id: string, flag: boolean }>;
  setIsAddingNewSet: Action<WorkoutModel, { workoutId: string, exerciseId: string, flag: boolean }>;
  setNewSet: Action<WorkoutModel, { workoutId: string, exerciseId: string, setNumber: number }>;
  saveAddExercise: Thunk<WorkoutModel, { workoutId: string, exercise: Exercise }>;
  addExercise: Action<WorkoutModel, { workoutId: string, exercise: Exercise }>;
  saveAddSet: Thunk<WorkoutModel, { workoutId: string, set: Set }>;
  addSet: Action<WorkoutModel, { workoutId: string, set: Set }>;
  saveDeleteSet: Thunk<WorkoutModel, { workoutId: string, exerciseName: string, set: Set }>;
  deleteSet: Action<WorkoutModel, { workoutId: string, set: Set }>;
  saveDeleteExercise: Thunk<WorkoutModel, { workoutId: string, exercise: Exercise }>;
  deleteExercise: Action<WorkoutModel, { workoutId: string, exercise: Exercise }>;
  saveDeleteWorkout: Thunk<WorkoutModel, string>;
  deleteWorkout: Action<WorkoutModel, string>;
}

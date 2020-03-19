import { Action } from 'easy-peasy';

import Set from './Set';
import Exercise from './Exercise';
import Workout from './Workout';

export default interface WorkoutModel {
  entries: Exercise[];
  isAddingNewExercise: boolean;
  updateSet: Action<WorkoutModel, { field: string, value: number, id: string, setNumber: number }>;
  setEditExerciseIndex: Action<WorkoutModel, { id: string, setNumber: number }>;
  setIsAddingNewExercise: Action<WorkoutModel, boolean>;
  setIsAddingNewSet: Action<WorkoutModel, { name: string, setNumber: number, flag: boolean }>;
  addExercise: Action<WorkoutModel, Set>;
  addSet: Action<WorkoutModel, Set>;
  deleteSet: Action<WorkoutModel, Set>;
}

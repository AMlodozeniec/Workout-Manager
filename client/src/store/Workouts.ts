import { action, debug } from 'easy-peasy';
import uniqueId from 'lodash/uniqueId';

import WorkoutModel from '../interfaces/WorkoutModel';
import Set from '../interfaces/Set';

const Workouts: WorkoutModel = {
  entries: [
    {
      id: uniqueId(),
      name: 'Workout 1',
      exercises: [
        {
          id: uniqueId(),
          name: 'Bench Press',
          sets: [
            {
              name: 'Bench Press',
              setNumber: 1,
              weight: 200,
              reps: 5,
              newSet: false,
            },
            {
              name: 'Bench Press',
              setNumber: 2,
              weight: 200,
              reps: 3,
              newSet: false,
            },
          ],
          isAddingNewSet: false,
          editSetIdx: -1,
        },
        {
          id: uniqueId(),
          name: 'Squat',
          sets: [
            {
              name: 'Squat',
              setNumber: 1,
              weight: 250,
              reps: 5,
              newSet: false,
            },
            {
              name: 'Squat',
              setNumber: 2,
              weight: 250,
              reps: 5,
              newSet: false,
            },
            {
              name: 'Squat',
              setNumber: 3,
              weight: 250,
              reps: 5,
              newSet: false,
            },
          ],
          isAddingNewSet: false,
          editSetIdx: -1,
        },
      ],
      isAddingNewExercise: false,
    },
    {
      id: uniqueId(),
      name: 'Workout 2',
      exercises: [
        {
          id: uniqueId(),
          name: 'Squat',
          sets: [
            {
              name: 'Squat',
              setNumber: 1,
              weight: 250,
              reps: 5,
              newSet: false,
            },
            {
              name: 'Squat',
              setNumber: 2,
              weight: 250,
              reps: 5,
              newSet: false,
            },
            {
              name: 'Squat',
              setNumber: 3,
              weight: 250,
              reps: 5,
              newSet: false,
            },
          ],
          isAddingNewSet: false,
          editSetIdx: -1,
        },
      ],
      isAddingNewExercise: false,
    },

  ],
  addWorkout: action((state, workout) => {
    state.entries.push(workout);
  }),
  setEditExerciseIndex: action((state, value) => {
    const { workoutId, exerciseId, setNumber } = value;
    console.log(debug(value));
    state.entries.forEach(workout => {
      if (workout.id === workoutId) {

        workout.exercises.forEach(exercise => {
          if (exercise.id === exerciseId) {
            if (setNumber != -1) {

            }
            exercise.editSetIdx = setNumber;
            exercise.sets.forEach(set => {
              if (set.setNumber === setNumber) {
                set.newSet = false;
              }
            })
          }
        })
      }
    });
  }),
  setIsAddingNewExercise: action((state, value) => {
    const { id, flag } = value;
    state.entries.forEach(e => {
      if (e.id === id) {
        e.isAddingNewExercise = flag;
      }
    });
  }),
  setIsAddingNewSet: action((state, obj) => {
    const { workoutId, exerciseId, flag } = obj;
    state.entries.forEach(workout => {
      if (workout.id === workoutId) {
        workout.exercises.forEach(exercise => {
          if (exercise.id === exerciseId) {
            exercise.isAddingNewSet = flag;
          }
        })
      }
    });
  }),
  setNewSet: action((state, value) => {
    const { workoutId, exerciseId, setNumber } = value;
    state.entries.forEach(workout => {
      if (workout.id === workoutId) {
        workout.exercises.forEach(exercise => {
          if (exercise.id === exerciseId) {
            exercise.sets.forEach(set => {
              if (set.setNumber === setNumber) {
                set.newSet = false;
              }
            })
          }
        })
      }
    });
  }),
  addExercise: action((state, value) => {
    const { workoutId, exercise } = value;
    state.entries.forEach(workout => {
      if (workout.id === workoutId) {
        workout.exercises.push(exercise);
      }
    });
  }),
  addSet: action((state, value) => {
    const { workoutId, set } = value;
    state.entries.forEach(workout => {
      if (workout.id === workoutId) {
        workout.exercises.forEach(exercise => {
          if (exercise.name === set.name) {
            exercise.sets.push(set);
          }
        })
      }
    });
  }),
  updateSet: action((state, obj) => {
    const { field, value, exerciseId, setNumber, workoutId } = obj;
    state.entries.forEach(workout => {
      if (workout.id === workoutId) {
        workout.exercises.forEach(exercise => {
          if (exercise.id === exerciseId) {
            exercise.sets.forEach(set => {
              if (set.setNumber === setNumber) {
                if (field === 'weight') {
                  set.weight = value;
                } else if (field === 'reps') {
                  set.reps = value;
                }
              }
            })
          }
        })
      }
    });
  }),
  deleteSet: action((state, value) => {
    const { workoutId, set } = value;
    //state.isAddingNewExercise = false;
    let workoutIndex = -1;
    let exerciseIndex = -1;
    state.entries.filter((workout, i) => {
      if (workout.id === workoutId) {
        workout.exercises.forEach((exercise, j) => {
          if (exercise.name === set.name) {
            const updatedEntry = exercise.sets.filter(entry => entry.setNumber !== set.setNumber);
            state.entries[i].exercises[j].sets = updatedEntry;
            workoutIndex = i;
            exerciseIndex = j;
            return true;
          }
        })

      }
      return true;
    });

    state.entries[workoutIndex].exercises[exerciseIndex].sets.forEach((entry, i) => {
      if (i < set.setNumber - 1) return;
      entry.setNumber -= 1;
    });

    if (state.entries[workoutIndex].exercises[exerciseIndex].sets.length === 0) {
      state.entries[workoutIndex].exercises.splice(exerciseIndex, 1);
    }

    if (state.entries[workoutIndex].exercises.length === 0) {
      state.entries.splice(workoutIndex, 1);
    }
  }),
};

export default Workouts;

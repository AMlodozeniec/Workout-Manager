import { action, debug, thunk } from 'easy-peasy';

import WorkoutModel from '../interfaces/WorkoutModel';

const Workouts: WorkoutModel = {
  entries: [
    // {
    //   id: uniqueId(),
    //   name: 'Workout 1',
    //   exercises: [
    //     {
    //       id: uniqueId(),
    //       name: 'Bench Press',
    //       sets: [
    //         {
    //           name: 'Bench Press',
    //           setNumber: 1,
    //           weight: 200,
    //           reps: 5,
    //           newSet: false,
    //         },
    //         {
    //           name: 'Bench Press',
    //           setNumber: 2,
    //           weight: 200,
    //           reps: 3,
    //           newSet: false,
    //         },
    //       ],
    //       isAddingNewSet: false,
    //       editSetIdx: -1,
    //     },
    //     {
    //       id: uniqueId(),
    //       name: 'Squat',
    //       sets: [
    //         {
    //           name: 'Squat',
    //           setNumber: 1,
    //           weight: 250,
    //           reps: 5,
    //           newSet: false,
    //         },
    //         {
    //           name: 'Squat',
    //           setNumber: 2,
    //           weight: 250,
    //           reps: 5,
    //           newSet: false,
    //         },
    //         {
    //           name: 'Squat',
    //           setNumber: 3,
    //           weight: 250,
    //           reps: 5,
    //           newSet: false,
    //         },
    //       ],
    //       isAddingNewSet: false,
    //       editSetIdx: -1,
    //     },
    //   ],
    //   isAddingNewExercise: false,
    //   isShowingExercises: true,
    // },
    // {
    //   id: uniqueId(),
    //   name: 'Workout 2',
    //   exercises: [
    //     {
    //       id: uniqueId(),
    //       name: 'Squat',
    //       sets: [
    //         {
    //           name: 'Squat',
    //           setNumber: 1,
    //           weight: 250,
    //           reps: 5,
    //           newSet: false,
    //         },
    //         {
    //           name: 'Squat',
    //           setNumber: 2,
    //           weight: 250,
    //           reps: 5,
    //           newSet: false,
    //         },
    //         {
    //           name: 'Squat',
    //           setNumber: 3,
    //           weight: 250,
    //           reps: 5,
    //           newSet: false,
    //         },
    //       ],
    //       isAddingNewSet: false,
    //       editSetIdx: -1,
    //     },
    //   ],
    //   isAddingNewExercise: false,
    //   isShowingExercises: false,
    // },

  ],
  getEntries: thunk(async (state) => {
    const response = await fetch('http://localhost:8095/user/workouts/all');
    const entries = await response.json();
    state.setEntries(entries);
  }),
  setEntries: action((state, entries) => {
    state.entries = entries;
  }),
  addWorkout: action((state, workout) => {
    state.entries.push(workout);
  }),
  createWorkout: thunk(async (state, workout) => {
    const response = await fetch('http://localhost:8095/user/workouts/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(workout),
    });
    const result = await response.json();
    state.addWorkout(result);
  }),
  setEditExerciseIndex: action((state, value) => {
    const { workoutId, exerciseId, setNumber } = value;
    state.entries.forEach(workout => {
      if (workout.id === workoutId) {
        workout.exercises.forEach(exercise => {
          if (exercise.id === exerciseId) {
            if (setNumber !== -1) {

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
  setIsShowingExercises: action((state, value) => {
    const { workoutId, flag } = value;

    state.entries.forEach(workout => {
      if (workout.id === workoutId) {
        workout.showingExercises = flag;
      }
    })
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
  saveAddExercise: thunk(async (state, value) => {
    const { workoutId, exercise } = value;
    await fetch(`http://localhost:8095/user/workouts/${workoutId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(exercise),
    });
    state.addExercise(value);
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
  saveAddSet: thunk(async (state, value) => {
    const { workoutId, set } = value;
    await fetch(`http://localhost:8095/user/workouts/${workoutId}/${set.name}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(set),
    });
    state.addSet({ workoutId, set });
  }),
  updateExercise: action((state, obj) => {
    const { value, exerciseId, workoutId } = obj;
    state.entries.forEach(workout => {
      if (workout.id === workoutId) {
        workout.exercises.forEach(exercise => {
          if (exercise.id === exerciseId) {
            exercise.name = value;
            exercise.sets.forEach(set => {
              set.name = value;
            })
          }
        })
      }
    });
  }),
  updateSet: action((state, obj) => {
    const { weight, reps, exercise, setNumber, workoutId } = obj;
    state.entries.forEach(workout => {
      if (workout.id === workoutId) {
        workout.exercises.forEach(e => {
          if (e.id === exercise.id) {
            e.sets.forEach(set => {
              if (set.setNumber === setNumber) {
                set.weight = weight;
                set.reps = reps;
              }
            })
          }
        })
      }
    });
  }),
  saveUpdateSet: thunk(async (state, obj) => {
    const { weight, reps, exercise, setNumber, workoutId } = obj;
    const updateObj = {
      weight,
      reps,
    };
    await fetch(`http://localhost:8095/user/workouts/${workoutId}/${exercise.name}/${setNumber}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updateObj),
    });
    state.updateSet(obj);
  }),
  deleteSet: action((state, value) => {
    const { workoutId, set } = value;
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
  saveDeleteSet: thunk(async (state, value) => {
    const { workoutId, exerciseName, set } = value;
    await fetch(`http://localhost:8095/user/workouts/${workoutId}/${exerciseName}/${set.setNumber}`, {
      method: 'DELETE',
    });
    state.deleteSet(value);
  }),
  deleteExercise: action((state, value) => {
    const { workoutId, exercise } = value;
    state.entries.forEach(workout => {
      if (workout.id === workoutId) {
        const updatedWorkout = workout.exercises.filter(e => e.name !== exercise.name);
        workout.exercises = updatedWorkout;
      }
    });
  }),
  saveDeleteExercise: thunk(async (state, value) => {
    const { workoutId, exercise } = value;
    await fetch(`http://localhost:8095/user/workouts/${workoutId}/${exercise.name}`, {
      method: 'DELETE',
    });
    state.deleteExercise({ workoutId, exercise });
  }),
  deleteWorkout: action((state, workoutId) => {
    state.entries.forEach(entry => {
      if (entry.id === workoutId) {
        const updatedEntries = state.entries.filter(e => e.id !== workoutId);
        state.entries = updatedEntries;
      }
    });
  }),
  saveDeleteWorkout: thunk(async (state, workoutId) => {
    await fetch(`http://localhost:8095/user/workouts/${workoutId}`, {
      method: 'DELETE',
    });
    state.deleteWorkout(workoutId);
  }),

};

export default Workouts;

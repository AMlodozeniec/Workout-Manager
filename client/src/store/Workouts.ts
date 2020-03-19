import { action, debug } from 'easy-peasy';
import uniqueId from 'lodash/uniqueId';

import WorkoutModel from '../interfaces/WorkoutModel';
import Set from '../interfaces/Set';

const Workout: WorkoutModel = {
  entries: [
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
  setEditExerciseIndex: action((state, value) => {
    const { id, setNumber } = value;
    state.entries.forEach(exercise => {
      if (exercise.id === id) {
        exercise.editSetIdx = setNumber;
      }
    });
  }),
  setIsAddingNewExercise: action((state, value) => {
    state.isAddingNewExercise = value;
  }),
  setIsAddingNewSet: action((state, obj) => {
    const { name, setNumber, flag } = obj;
    const exerciseIndex = state.entries.findIndex(e => e.name === name);
    state.entries[exerciseIndex].sets.forEach(e => {
      // console.log(`${e.setNumber} -> ${setNumber}`);
      if (e.setNumber === setNumber) {
        console.log(`found`);
        e.newSet = false;
      }
    });

    console.log(debug(state.entries[exerciseIndex].sets));

  }),
  addExercise: action((state, set) => {
    const sets: Set[] = [];
    const exercise = {
      id: uniqueId(),
      name: set.name,
      sets,
      isAddingNewSet: false,
      editSetIdx: -1,
    };
    exercise.sets.push(set);
    state.entries.push(exercise);
    // state.entries.push(set);
    // const entryIndex = state.entries.findIndex(e => e.name === entry.name);

    // if (entryIndex !== -1) {
    //   entry.sets.push()
    //   const { sets: setSets } = state.entries[entryIndex];
    //   setSets.push({
    //     name: entry.name,
    //     setNumber: setSets.length + 1,
    //     weight: entry.sets[entryIndex],
    //     reps: entry.reps,
    //   });
    // } else {
    //   const entryToAdd = {
    //     name: entry.name,
    //     sets: [{
    //       name: entry.name,
    //       setNumber: 1,
    //       weight: entry.weight,
    //       reps: entry.reps,
    //     }],
    //     isAddingNewSet: false,
    //   };
    //   state.entries.push(entryToAdd);
    // }
  }),
  addSet: action((state, set) => {
    const entryIndex = state.entries.findIndex(e => e.name === set.name);

    const entry = state.entries[entryIndex];
    entry.sets.push(set);
    // entry.isAddingNewSet = false;
  }),
  updateSet: action((state, obj) => {
    const { field, value, id, setNumber } = obj;
    state.entries.map(e => {
      if (e.id === id) {
        e.sets.map(set => {
          if (setNumber === set.setNumber) {
            if (field === 'weight') {
              set.weight = value;
            } else if (field === 'reps') {
              set.reps = value;
            }
          }
          return set;
        })
      }
      return e;
    });
  }),
  deleteSet: action((state, exercise) => {
    state.isAddingNewExercise = false;
    let exerciseIndex = -1;
    state.entries.filter((entry, i) => {
      if (entry.name === exercise.name) {
        const updatedEntry = entry.sets.filter(set => set.setNumber !== exercise.setNumber);
        state.entries[i].sets = updatedEntry;
        exerciseIndex = i;
        return true;
      }
      return true;
    });

    state.entries[exerciseIndex].sets.forEach((entry, i) => {
      if (i < exercise.setNumber - 1) return;
      entry.setNumber -= 1;
    });

    if (state.entries[exerciseIndex].sets.length === 0) {
      state.entries.splice(exerciseIndex, 1);
    }
  }),
};

export default Workout;

import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { FaPlus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import ExerciseInterface from '../../interfaces/Exercise';
import Workout from './Workout';

import { useStoreState, useStoreActions } from '../../hooks';
import useStyles from './styles';

const Home: React.FC = () => {
  const classes = useStyles();
  const entries = useStoreState((state) => state.workouts.entries);
  const { createWorkout, getEntries } = useStoreActions((state) => state.workouts);

  const handleAdd: Function = () => {
    const newWorkout = {
      id: uuidv4(),
      name: `Workout ${entries.length + 1}`,
      exercises: [],
      isAddingNewExercise: false,
      showingExercises: true,
    };
    createWorkout(newWorkout);
  };

  useEffect(() => {
    getEntries();
  }, []); // eslint-disable-line



  const displayWorkouts: Function = (exercises: ExerciseInterface[]) => (
    <>
      {
        entries.length === 0 ? null
          :
          entries.map(workout => (
            <>
              <Workout
                key={`${workout.id} + ${workout.name} + ${workout.isAddingNewExercise}`}
                workout={workout}
              />
            </>
          ))
      }
    </>
  );

  return (
    <div>
      {
        displayWorkouts()
      }

      <Box>
        <Button type="submit" variant="outlined" className={classes.workoutButton} onClick={(): void => handleAdd()}>
          <FaPlus />
            Add New Workout
          </Button>
      </Box>

    </div>
  );
};

export default Home;

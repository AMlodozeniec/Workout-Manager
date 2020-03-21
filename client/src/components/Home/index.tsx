import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { FaPlus } from 'react-icons/fa';
import uniqueId from 'lodash/uniqueId';

import ExerciseInterface from '../../interfaces/Exercise';
import Workout from './Workout';
import { useStoreState, useStoreActions } from '../../hooks';

const Home: React.FC = () => {
  const entries = useStoreState((state) => state.workouts.entries);
  const { addWorkout } = useStoreActions((state) => state.workouts);

  const handleAdd: Function = () => {
    const newWorkout = {
      id: uniqueId(),
      name: `Workout ${entries.length + 1}`,
      exercises: [],
      isAddingNewExercise: false,
    };
    addWorkout(newWorkout);
  };

  /* const displaySets: Function = () => (
     entries.length === 0 ? null
       : entries.map(exercise => (
         exercise.sets.map(set => (
           <Row set={set} exercise={exercise} key={`aosijdaosjd-${exercise.id} + ${set.setNumber}`} />
         ))
       ))
   );
   */

  const displayWorkouts: Function = (exercises: ExerciseInterface[]) => (
    entries.length === 0 ? null
      : entries.map(workout => (
        <Workout
          key={`${workout.id}`}
          workout={workout}
        //id={`${workout.id}`}
        //name={workout.name}
        //exercises={exercises}
        />
      ))
  );

  return (
    <div>
      {
        displayWorkouts()
      }
      {
        //        <TableContainer component={Paper}>
        //          <Table size="small" aria-label="a dense table">
        //            <TableHead>
        //              <TableRow>
        //                <TableCell>Exercise Name</TableCell>
        //                <TableCell align="right">Set #</TableCell>
        //                <TableCell align="right">Weight (lbs)</TableCell>
        //                <TableCell align="right">Reps</TableCell>
        //                <TableCell />
        //                <TableCell />
        //              </TableRow>
        //            </TableHead>
        //            <TableBody>
        //              {
        //                displaySets()
        //              }
        //              {
        //                isAddingNewExercise
        //                  ? <WorkoutEntryForm />
        //                  : null
        //              }
        //            </TableBody>
        //          </Table>
        //        </TableContainer>
      }
      <Box>
        <Button type="submit" variant="outlined" onClick={(): void => handleAdd()}>
          <FaPlus />
            Add New Workout
          </Button>
      </Box>

    </div>
  );
};

export default Home;

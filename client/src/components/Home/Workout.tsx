import React, { FunctionComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { FaPlus } from 'react-icons/fa';

import { useStoreState, useStoreActions } from '../../hooks';
import WorkoutInterface from '../../interfaces/Workout';
import ExerciseInterface from '../../interfaces/Exercise';
import WorkoutEntryForm from '../WorkoutEntryForm';
import Row from './Row';
import Exercise from './Exercise';

type WorkoutProps = {
  workout: WorkoutInterface,
};

const Workout: FunctionComponent<WorkoutProps> = ({ workout }) => {
  const { id, name, exercises, isAddingNewExercise } = workout;

  const { setIsAddingNewExercise } = useStoreActions((state) => state.workouts);

  const displayExercises: Function = (exercises: ExerciseInterface[]) => (
    exercises.length === 0 ? null
      : exercises.map(exercise => (
        <Exercise
          key={exercise.id}
          exercise={exercise}
          workoutId={id}
        />
      ))
  );

  const handleAdd: Function = () => {
    setIsAddingNewExercise({ id, flag: true });
  };

  return (
    <>
      <p>{name}</p>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Exercise Name</TableCell>
              <TableCell align="right">Set #</TableCell>
              <TableCell align="right">Weight (lbs)</TableCell>
              <TableCell align="right">Reps</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              displayExercises(exercises)
            }
            {
              isAddingNewExercise
                ? <WorkoutEntryForm id={id} />
                : null
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Button type="submit" variant="outlined" onClick={(): void => handleAdd()}>
          <FaPlus />
            Add New Exercise
          </Button>
      </Box>
    </>
  );
};

export default Workout;

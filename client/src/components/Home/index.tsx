import React from 'react';
// import Button from '@material-ui/core/Button';
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

import Row from './Row';
import { useStoreState, useStoreActions } from '../../hooks';
import WorkoutEntryForm from '../WorkoutEntryForm';

const Home: React.FC = () => {
  const entries = useStoreState((state) => state.workouts.entries);
  const isAddingNewExercise = useStoreState((state) => state.workouts.isAddingNewExercise);
  const { setIsAddingNewExercise } = useStoreActions((state) => state.workouts);

  const handleAdd: Function = () => {
    setIsAddingNewExercise(true);
  };

  const displaySets: Function = () => (
    entries.length === 0 ? null
      : entries.map(exercise => (
        exercise.sets.map(set => (
          <Row set={set} exercise={exercise} key={`aosijdaosjd-${exercise.id} + ${set.setNumber}`} />
        ))
      ))
  );

  // const displayWorkouts: Function = () => {
  //   entries.length === 0 ? null 
  //     : entries.map(workout => (
  //       workout.exercises.map(exercise => )
  //     ))
  // };  

  return (
    <div>
      {/* 
        displayWorkouts()
      */}
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
              displaySets()
            }
            {
              isAddingNewExercise
                ? <WorkoutEntryForm />
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
      {/* </Workout> */}

    </div>
  );
};

export default Home;

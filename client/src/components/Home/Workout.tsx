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
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import { FaPlus } from 'react-icons/fa';

import { useStoreActions } from '../../hooks';
import WorkoutInterface from '../../interfaces/Workout';
import ExerciseInterface from '../../interfaces/Exercise';
import WorkoutEntryForm from '../WorkoutEntryForm';
import Exercise from './Exercise';
import makeStyles from './styles';

type WorkoutProps = {
  workout: WorkoutInterface,
};

const Workout: FunctionComponent<WorkoutProps> = ({ workout }) => {
  const classes = makeStyles();
  const { id, name, exercises, isAddingNewExercise, showingExercises: isShowingExercises } = workout;

  const { setIsAddingNewExercise, setIsShowingExercises, saveDeleteWorkout } = useStoreActions((state) => state.workouts);

  const displayExercises: Function = (exercises: ExerciseInterface[]) => (
    exercises.length === 0 ? null
      : exercises.map(exercise => (
        <Exercise
          key={`${exercise.id} + ${exercise.name}-exercises`}
          exercise={exercise}
          workoutId={id}
        />
      ))
  );

  const handleAdd: Function = () => {
    setIsAddingNewExercise({ id, flag: true });
  };

  const displayTable = () => (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Exercise Name</TableCell>
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

  const setWorkoutName = (flag: boolean) => {
    const suffix = flag ? `🔻` : `🔺`;
    return `${name} ${suffix}`;
  };

  const handleDeleteWorkout: Function = (workoutId: string) => {
    saveDeleteWorkout(workoutId);
  };

  return (
    <>
      <Button variant="outlined" className={classes.workoutButton} onClick={() => setIsShowingExercises({ workoutId: id, flag: !isShowingExercises })} > {setWorkoutName(isShowingExercises)}</Button>
      <RemoveCircleOutlineOutlinedIcon onClick={(): void => handleDeleteWorkout(id)} style={{ float: 'right' }} />
      {
        isShowingExercises ? displayTable()
          : null
      }
    </>
  );
};

export default Workout;

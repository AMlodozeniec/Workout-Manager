import React, { FunctionComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import AddNewExerciseIcon from './AddNewExerciseIcon';
import Set from '../../interfaces/Set';
import Exercise from '../../interfaces/Exercise';
import useStyles from '../WorkoutEntryForm/styles';
import { useStoreActions } from '../../hooks';
import NewSetRow from '../WorkoutEntryForm/NewSetRow';

type RowProps = {
  set: Set,
  exercise: Exercise,
  workoutId: string,
};

const UpdatedSetSchema = yup.object().shape({
  weight: yup
    .number()
    .required('Required.'),
  reps: yup
    .number()
    .required('Required.'),
});

const Row: FunctionComponent<RowProps> = ({ set, exercise, workoutId }) => {
  const classes = useStyles();
  const { deleteSet, setEditExerciseIndex, updateSet, setIsAddingNewSet, setNewSet } = useStoreActions(state => state.workouts);
  const { register, handleSubmit, errors } = useForm<Set>({
    validationSchema: UpdatedSetSchema,
  });


  const editSet = (workoutId: string, exerciseId: string, setNumber: number) => {
    setEditExerciseIndex({ workoutId, exerciseId, setNumber });
  };

  const finishEditingSet = (workoutId: string, exerciseId: string, setNumber: number) => {
    setEditExerciseIndex({ workoutId, exerciseId, setNumber: -1 });
  };

  const finishAddingNewSet = (workoutId: string, exerciseId: string, setNumber: number) => {
    setNewSet({ workoutId, exerciseId, setNumber });
  };

  const handleChange = (e: any, field: string, exercise: Exercise, set: Set, workoutId: string) => {
    const { value } = e.target;
    updateSet({ field, value, exerciseId: exercise.id, setNumber: set.setNumber, workoutId });
    // console.log(value);

  };

  const onSubmit = (data: Set) => {
    if (set.newSet) {
      setIsAddingNewSet({
        workoutId,
        exerciseId: exercise.id,
        flag: false,
      });
      finishAddingNewSet(workoutId, exercise.id, set.setNumber);
    }
    else {
      finishEditingSet(workoutId, exercise.id, set.setNumber);
    }
  };

  const editingRowField = (field: string) => {
    const lowercaseField = field.toLowerCase();
    let fieldVal;
    if (lowercaseField === 'weight') {
      fieldVal = set.weight;
    } else if (lowercaseField === 'reps') {
      fieldVal = set.reps;
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          inputRef={register}
          label={field}
          name={lowercaseField}
          size="small"
          className={classes.weightRepsField}
          onChange={(e) => handleChange(e, lowercaseField, exercise, set, workoutId)}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={fieldVal}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        />
      </form>
    )
  };

  const currentlyEditing = exercise.editSetIdx === set.setNumber;

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="entry">
          {set.setNumber === 1 ? exercise.name : null}
          <AddNewExerciseIcon workoutId={workoutId} setNumber={set.setNumber} exercise={exercise} />
        </TableCell>
        <TableCell align="right">{set.setNumber}</TableCell>
        <TableCell align="right">{currentlyEditing || set.newSet ? editingRowField('Weight') : set.weight}</TableCell>
        <TableCell align="right">{currentlyEditing || set.newSet ? editingRowField('Reps') : set.reps}</TableCell>
        <TableCell align="center">
          {currentlyEditing || set.newSet ?
            <DoneIcon onClick={(): void => finishEditingSet(workoutId, exercise.id, set.setNumber)} />
            : <EditIcon onClick={(): void => editSet(workoutId, exercise.id, set.setNumber)} />
          }
        </TableCell>
        <TableCell align="center">
          <RemoveCircleOutlineOutlinedIcon onClick={(): void => deleteSet({ workoutId, set })} />
        </TableCell>
      </TableRow>
      {
        exercise.isAddingNewSet
          ? <NewSetRow workoutId={workoutId} exercise={exercise} />
          : null
      }
    </>
  );
};

export default Row;

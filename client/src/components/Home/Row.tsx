import React, { FunctionComponent } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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
};

const UpdatedSetSchema = yup.object().shape({
  weight: yup
    .number()
    .required('Required.'),
  reps: yup
    .number()
    .required('Required.'),
});

const Row: FunctionComponent<RowProps> = ({ set, exercise }) => {
  const classes = useStyles();
  const { deleteSet, setEditExerciseIndex, updateSet, setIsAddingNewSet } = useStoreActions(state => state.workouts);
  const { register, handleSubmit, errors } = useForm<Set>({
    validationSchema: UpdatedSetSchema,
  });


  const editSet = (id: string, setNumber: number) => {
    setEditExerciseIndex({ id, setNumber });
  };

  const finishEditingSet = (id: string, setNumber: number) => {
    setEditExerciseIndex({ id, setNumber: -1 });
  };

  const handleChange = (e: any, field: string, exercise: Exercise, set: Set) => {
    const { value } = e.target;
    updateSet({ field, value, id: exercise.id, setNumber: set.setNumber });
    // console.log(value);

  };

  const onSubmit = (data: Set) => {
    if (set.newSet) {
      setIsAddingNewSet({
        name: exercise.name,
        setNumber: set.setNumber,
        flag: false,
      });
    }
    console.log(set);
    finishEditingSet(exercise.id, set.setNumber);
  };

  const editingRowField = (field: string) => {
    const lowercaseField = field.toLowerCase();
    let fieldVal;
    // const { weight, reps } = set;}
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
          onChange={(e) => handleChange(e, lowercaseField, exercise, set)}
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
          <AddNewExerciseIcon setNumber={set.setNumber} exercise={exercise} />
        </TableCell>
        <TableCell align="right">{set.setNumber}</TableCell>
        <TableCell align="right">{currentlyEditing || set.newSet ? editingRowField('Weight') : set.weight}</TableCell>
        <TableCell align="right">{currentlyEditing || set.newSet ? editingRowField('Reps') : set.reps}</TableCell>
        <TableCell align="center">
          {currentlyEditing || set.newSet ?
            <DoneIcon onClick={(): void => finishEditingSet(exercise.id, set.setNumber)} />
            : <EditIcon onClick={(): void => editSet(exercise.id, set.setNumber)} />
          }
        </TableCell>
        <TableCell align="center">
          <RemoveCircleOutlineOutlinedIcon onClick={(): void => deleteSet(set)} />
        </TableCell>
      </TableRow>
      {
        exercise.isAddingNewSet && set.setNumber === exercise.sets.length
          ? <NewSetRow exercise={exercise} />
          : null
      }
    </>
  );
};

export default Row;

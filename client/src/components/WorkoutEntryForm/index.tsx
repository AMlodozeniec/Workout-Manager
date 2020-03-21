import React, { FunctionComponent } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import uniqueId from 'lodash/uniqueId';

import useStyles from './styles';
import Set from '../../interfaces/Set';
import { useStoreState, useStoreActions } from '../../hooks';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const SetSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Required.'),
  setNumber: yup
    .number()
    .default(1),
  weight: yup
    .number()
    .required('Required.'),
  reps: yup
    .number()
    .required('Required.'),
});

type WorkoutEntryFormProps = {
  id: string,
};

const WorkoutEntryForm: FunctionComponent<WorkoutEntryFormProps> = ({ id }) => {
  const classes = useStyles();
  const entries = useStoreState((state) => state.workouts.entries);

  const { addExercise, setIsAddingNewExercise } = useStoreActions(state => state.workouts);

  const { register, handleSubmit, errors } = useForm<Set>({
    validationSchema: SetSchema,
  });

  const onSubmit = (data: Set): void => {
    const sets: Set[] = [];
    const exercise = {
      id: uniqueId(),
      name: data.name,
      sets,
      isAddingNewSet: false,
      editSetIdx: -1,
    };
    exercise.sets.push(data);
    addExercise({ workoutId: id, exercise });
    setIsAddingNewExercise({ id, flag: false });
  };

  return (
    <TableRow>
      <TableCell component="th" scope="entry">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={classes.formContainer}>
          <TextField
            inputRef={register}
            label="Name"
            name="name"
            size="small"
            className={classes.exerciseNameField}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />
        </form>
      </TableCell>
      <TableCell align="right">1</TableCell>
      <TableCell align="right">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={classes.formContainer}>
          <TextField
            inputRef={register}
            label="Weight"
            name="weight"
            size="small"
            className={classes.weightRepsField}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          // error={!!errors.sets.weight}
          // helperText={errors.sets.weight ? errors.sets.weight.message : ''}
          />
        </form>
      </TableCell>
      <TableCell align="right">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={classes.formContainer}>
          <TextField
            inputRef={register}
            label="Reps"
            name="reps"
            size="small"
            className={classes.weightRepsField}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          // error={!!errors.reps}
          // helperText={errors.reps ? errors.reps.message : ''}
          />
        </form>
      </TableCell>
      <TableCell align="center">
        <DoneIcon onClick={handleSubmit(onSubmit)} />
      </TableCell>
      <TableCell align="center">
        <ClearIcon onClick={(): void => setIsAddingNewExercise({ id, flag: false })} />
      </TableCell>
    </TableRow>
  );
};

export default WorkoutEntryForm;

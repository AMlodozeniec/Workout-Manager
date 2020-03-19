import React, { FunctionComponent } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useStoreActions } from '../../hooks';
import useStyles from './styles';
import Set from '../../interfaces/Set';
import Exercise from '../../interfaces/Exercise';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const SetSchema = yup.object().shape({
  name: yup
    .string(),
  setNumber: yup
    .number(),
  weight: yup
    .number()
    .required('Required.'),
  reps: yup
    .number()
    .required('Required.'),
});

type NewSetRowProps = {
  exercise: Exercise,
};

const NewSetRow: FunctionComponent<NewSetRowProps> = ({ exercise }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<Set>({
    validationSchema: SetSchema,
  });
  const { addSet, setIsAddingNewSet } = useStoreActions(state => state.workouts);

  const onSubmit = (data: Set): void => {
    data = {
      ...data,
      setNumber: exercise.sets.length + 1,
      name: exercise.name,
    };
    addSet(data);
    // setIsAddingNewSet({
    //   name: data.name,
    //   setNumber: data.setNumber,
    //   flag: true,
    // });
  };

  return (
    <TableRow>
      <TableCell component="th" scope="entry">{null}</TableCell>
      <TableCell align="right">{exercise.sets.length + 1}</TableCell>
      <TableCell align="right">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            inputRef={register}
            label="Weight"
            name="weight"
            size="small"
            className={classes.weightRepsField}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.weight}
            helperText={errors.weight ? errors.weight.message : ''}
          />
        </form>
      </TableCell>
      <TableCell align="right">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            inputRef={register}
            label="Reps"
            name="reps"
            size="small"
            className={classes.weightRepsField}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.reps}
            helperText={errors.reps ? errors.reps.message : ''}
          />
        </form>
      </TableCell>
      <TableCell align="center">
        <DoneIcon onClick={handleSubmit(onSubmit)} />
      </TableCell>
      <TableCell align="center">
        <ClearIcon onClick={(): void => setIsAddingNewSet({ name: exercise.name, setNumber: exercise.sets.length + 1, flag: false, })} />
      </TableCell>
    </TableRow>
  );
};

export default NewSetRow;

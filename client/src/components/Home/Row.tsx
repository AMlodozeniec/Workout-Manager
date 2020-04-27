import React, { FunctionComponent, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { useForm, Controller } from 'react-hook-form';
// import * as yup from 'yup';

import ExerciseIcons from './ExerciseIcons';
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

// const UpdatedSetSchema = yup.object().shape({
//   name: yup
//     .string(),
//   // .required('Required.'),
//   weight: yup
//     .number(),
//   // .required('Required.'),
//   reps: yup
//     .number(),
//   // .required('Required.'),
// });

const Row: FunctionComponent<RowProps> = ({ set, exercise, workoutId }) => {
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const { saveDeleteSet, setEditExerciseIndex, saveUpdateSet, updateExercise, setIsAddingNewSet, setNewSet } = useStoreActions(state => state.workouts);
  const { register, control, handleSubmit } = useForm();

  const editSet = (workoutId: string, exerciseId: string, setNumber: number) => {
    setEditExerciseIndex({ workoutId, exerciseId, setNumber });
  };

  const finishEditingSet = (workoutId: string, exerciseId: string, setNumber: number) => {
    console.log(control);
    // saveUpdateSet({ weight, reps, exercise, setNumber: set.setNumber, workoutId });
    setEditExerciseIndex({ workoutId, exerciseId, setNumber: -1 });
  };

  const finishAddingNewSet = (workoutId: string, exerciseId: string, setNumber: number) => {
    setNewSet({ workoutId, exerciseId, setNumber });
  };

  // const handleChange = (e: any, field: string, exercise: Exercise, set: Set, workoutId: string) => {
  //   const { value } = e.target;
  //   saveUpdateSet({ field, value, exercise, setNumber: set.setNumber, workoutId });
  // };
  // const handleNameChange = (e: any, exercise: Exercise, workoutId: string) => {
  //   const { value } = e.target;
  //   updateExercise({ value, exerciseId: exercise.id, workoutId });
  // };


  const onSubmit = (data: any) => {
    const { weight, reps } = data;

    if (set.newSet) {
      setIsAddingNewSet({
        workoutId,
        exerciseId: exercise.id,
        flag: false,
      });
      finishAddingNewSet(workoutId, exercise.id, set.setNumber);
      saveUpdateSet({ weight, reps, exercise, setNumber: set.setNumber, workoutId });
    }
    else {
      saveUpdateSet({ weight, reps, exercise, setNumber: set.setNumber, workoutId });
      finishEditingSet(workoutId, exercise.id, set.setNumber);
      setIsEditingName(false);
    }

  };

  const editingRowField = (field: string) => {
    const lowercaseField = field.toLowerCase();
    let fieldVal;
    if (lowercaseField === 'weight') {
      fieldVal = set.weight;
    } else if (lowercaseField === 'reps') {
      fieldVal = set.reps;
    } else if (lowercaseField === 'name') {
      fieldVal = exercise.name;
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={TextField}
          name={lowercaseField}
          label={field}
          size="small"
          control={control}
          className={lowercaseField !== 'name' ? classes.weightRepsField : classes.exerciseNameField}
          value={fieldVal}
          // onChange={
          //   (e) => lowercaseField !== 'name' ?
          //     handleChange(e, lowercaseField, exercise, set, workoutId)
          //     : handleNameChange(e, exercise, workoutId)}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </form>
    )
  };

  const currentlyEditing = exercise.editSetIdx === set.setNumber;

  const renderExerciseName = () => {
    if (set.setNumber === 1) {
      return isEditingName ? editingRowField('Name') : exercise.name
    }
  };

  return (
    <>
      <TableRow>
        <TableCell align="center" component="th" scope="entry">
          <span
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={isHovered ? classes.hoveredExerciseName : ''}
            onClick={() => setIsEditingName(true)}
          >
            {
              renderExerciseName()
            }
          </span>
          <ExerciseIcons workoutId={workoutId} setNumber={set.setNumber} exercise={exercise} />
        </TableCell>
        <TableCell align="right">{set.setNumber}</TableCell>
        <TableCell align="right">{currentlyEditing || set.newSet ? editingRowField('Weight') : set.weight}</TableCell>
        <TableCell align="right">{currentlyEditing || set.newSet ? editingRowField('Reps') : set.reps}</TableCell>
        <TableCell align="center">
          {currentlyEditing || set.newSet ?
            // <DoneIcon onClick={(): void => finishEditingSet(workoutId, exercise.id, set.setNumber)} /> 
            null
            : <EditIcon onClick={(): void => editSet(workoutId, exercise.id, set.setNumber)} />
          }
        </TableCell>
        <TableCell align="center">
          <RemoveCircleOutlineOutlinedIcon onClick={(): void => saveDeleteSet({ workoutId, exerciseName: exercise.name, set })} />
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

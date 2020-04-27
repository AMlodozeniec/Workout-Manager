import React, { FunctionComponent } from 'react';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

import { useStoreActions } from '../../hooks';
import Exercise from '../../interfaces/Exercise';

type AddIconProps = {
  workoutId: string,
  setNumber: number,
  exercise: Exercise,
};

const ExerciseIcons: FunctionComponent<AddIconProps> = ({ workoutId, setNumber, exercise }) => {
  const { saveAddSet, saveDeleteExercise } = useStoreActions((state) => state.workouts);

  const handleAddNewSet = (): void => {
    const set = {
      name: exercise.name,
      setNumber: exercise.sets.length + 1,
      weight: 0,
      reps: 0,
      newSet: true,
    };
    saveAddSet({ workoutId, set });

  };

  const handleDeleteExercise = (): void => {
    saveDeleteExercise({ workoutId, exercise });
  };

  if (setNumber === 1) {
    return (
      <>
        <RemoveCircleOutlineOutlinedIcon onClick={(): void => handleDeleteExercise()} style={{ float: 'left' }} />
        <AddCircleOutline onClick={(): void => handleAddNewSet()} style={{ float: 'right' }} />
      </>
    );
  }
  return null;
};

export default ExerciseIcons;

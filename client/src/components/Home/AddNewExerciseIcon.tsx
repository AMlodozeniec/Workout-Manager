import React, { FunctionComponent } from 'react';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

import { useStoreActions } from '../../hooks';
import Exercise from '../../interfaces/Exercise';

type AddIconProps = {
  workoutId: string,
  setNumber: number,
  exercise: Exercise,
};

const AddNewExerciseIcon: FunctionComponent<AddIconProps> = ({ workoutId, setNumber, exercise }) => {
  const { addSet } = useStoreActions((state) => state.workouts);

  const handleAddNewSet = (): void => {
    const set = {
      name: exercise.name,
      setNumber: exercise.sets.length + 1,
      weight: 0,
      reps: 0,
      newSet: true,
    };
    addSet({ workoutId, set });

  };

  if (setNumber === 1) {
    return (
      <AddCircleOutline onClick={(): void => handleAddNewSet()} style={{ float: 'right' }} />
    );
  }
  return null;
};

export default AddNewExerciseIcon;

import React, { FunctionComponent } from 'react';

import ExerciseInterface from '../../interfaces/Exercise';
import Row from './Row';

type ExerciseProps = {
  exercise: ExerciseInterface,
  workoutId: string,
};

const Exercise: FunctionComponent<ExerciseProps> = ({ exercise, workoutId }) => {
  const { sets } = exercise;


  const displaySets = () => (
    sets.map(set => (
      <Row set={set} exercise={exercise} workoutId={workoutId} key={`${workoutId} +${exercise.id} + ${exercise.name} + ${set.setNumber * Math.random()}`} />
    ))
  );

  return (
    <>
      {
        displaySets()
      }
    </>
  )
}

export default Exercise;
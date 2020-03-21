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
import { FaPlus } from 'react-icons/fa';

import { useStoreState, useStoreActions } from '../../hooks';
import WorkoutInterface from '../../interfaces/Workout';
import ExerciseInterface from '../../interfaces/Exercise';
import WorkoutEntryForm from '../WorkoutEntryForm';
import Row from './Row';

type ExerciseProps = {
  exercise: ExerciseInterface,
  workoutId: string,
};

const Exercise: FunctionComponent<ExerciseProps> = ({ exercise, workoutId }) => {
  const { id, name, sets, isAddingNewSet, editSetIdx } = exercise;

  const displaySets = () => (
    sets.map(set => (
      <Row set={set} exercise={exercise} workoutId={workoutId} key={`${exercise.id} + ${set.setNumber}`} />
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
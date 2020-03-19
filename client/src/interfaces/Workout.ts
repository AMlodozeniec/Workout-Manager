import Exercise from './Exercise';

export default interface Workout {
  id: string,
  name: string,
  exercises: Exercise[],
};

import { createStore } from 'easy-peasy';

import Store from '../interfaces/Store';
import Workouts from './Workouts';

const store: Store = {
  workouts: Workouts,
};

export default createStore<Store>(store);

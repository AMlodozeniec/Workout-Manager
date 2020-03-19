import { createTypedHooks } from 'easy-peasy'; // 👈import the helper
import Store from '../interfaces/Store'; // 👈 import our model type

const typedHooks = createTypedHooks<Store>();

/* eslint-disable prefer-destructuring */
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

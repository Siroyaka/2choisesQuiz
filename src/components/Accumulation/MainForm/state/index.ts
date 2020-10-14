export { answer, interval, next } from './actions';
export type { ReturnTypes } from './actions';
import reducer from './reducers';
export { getInitialState } from './reducers';
export { AccumulationActionTypes } from './types';

export const accumulationReducer = reducer;
import { createStore } from 'redux';
import clientReducer from './reducers/clientReducer';

export const store = createStore(
  clientReducer,
);

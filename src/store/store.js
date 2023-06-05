import { combineReducers, configureStore } from '@reduxjs/toolkit'
import optionsSlice from './slyces/optionsSlice'
import ticketReducer from './slyces/ticketReducer'
const reducer = combineReducers({
  options:optionsSlice,
  ticket: ticketReducer,
})
export const store = configureStore({
  reducer: reducer
})
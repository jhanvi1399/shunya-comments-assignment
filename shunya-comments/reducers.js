/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import editorReducer from 'containers/HomePage/reducer';
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    editor: editorReducer,
    ...asyncReducers,
  });
}

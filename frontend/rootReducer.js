import { combineReducers } from 'redux'
import ModalState from 'Features/Modal/reducer'

/**
 * Combining reducers.
 * @type {Reducer<S>|Reducer<S, A>}
 */
const rootReducer = combineReducers({
  ModalState,
})

export default rootReducer

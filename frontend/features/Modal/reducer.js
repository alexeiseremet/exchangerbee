import { types } from './actions'

/**
 * Initial state of Modal
 *
 * @typedef initialState
 * @type {{title: null, content: null, show: boolean}}
 */
const initialState = {
  title: null,
  content: null,
  show: false
};

/**
 * Reducer that returns the next state tree.
 *
 * @param {Object} state Preview or initial state of Modal.
 * @param {string} type Action to handle.
 * @param {any} payload Data to pass to reducer.
 * @returns {Object} Return Next state of Modal.
 */
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SHOW_MODAL:
      return {
        title: payload.title,
        content: payload.content,
        show: true
      };

    case types.HIDE_MODAL:
      return initialState;

    default:
      return state;
  }
}

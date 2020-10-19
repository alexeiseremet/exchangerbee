export const modalContent = {
  AUTH: 'AUTH',
  SEND: 'SEND',
};

export const types = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
};

/**
 * Creates a Redux action that hide Modal component.
 *
 * @returns {{type: string, payload: Object}} Return type of action & data.
 */
export const hideModal = () => ({
  type: types.HIDE_MODAL,
});

/* Action creators */

/**
 * Creates a Redux action that show Modal component with specific content.
 *
 * @param {string} name Name of content which is show in Modal.
 * @returns {{type: string, payload: {title: string, content: XML}}} Return type of action & data.
 */
export const showModal = (name) => {
  switch (name) {
    case modalContent.AUTH:
      return {
        type: types.SHOW_MODAL,
        payload: {
          title: 'Auth',
          content: 'LoginForm',
        },
      };

    default:
      hideModal();
      return undefined;
  }
};

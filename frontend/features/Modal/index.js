import './styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import Svg from '../Svg';
// eslint-disable-next-line
import iconClose from '../../assets/images/icon-close.svg?sprite';

export class ModalMarkup extends React.Component {
  backdrop = React.createRef();

  inner = React.createRef();

  /**
   * Close Modal on press escape keyboard.
   *
   * @param {object} event Event object currently being handled.
   */
  handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      event.stopPropagation();
      this.props.closeModal();
    }
  };

  /**
   * Close Modal when click on backdrop element.
   *
   * @param {Object} event Event object currently being handled.
   */
  handleOutsideClick = (event) => {
    if (event.target === this.backdrop.current) {
      this.props.closeModal();
    }
  };

  /**
   * Focus Modal after show to activate keyDown handler.
   */
  componentDidUpdate() {
    const { modal } = this.props;
    if (modal && modal.show) {
      this.inner.current.focus();
    }
  }

  render() {
    const { modal, closeModal } = this.props;

    if (!modal) {
      return null;
    }

    const { show, title, content } = modal;

    if (!show) {
      return null;
    }

    return ReactDOM.createPortal(
      <div className="modal">
        <div
          className="modal__backdrop"
          ref={this.backdrop}
          onClick={this.handleOutsideClick}
        >
          <div
            className="modal__inner"
            ref={this.inner}
            onKeyDown={this.handleKeyDown}
            tabIndex="-1"
          >
            <div className="modal__header">
              <h3 className="modal__title">{title}</h3>
              <button
                className="modal__btn-close"
                type="button"
                onClick={closeModal}
              >
                <Svg glyph={iconClose.id} />
              </button>
            </div>
            <div className="modal__content">
              {content}
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('modal-portal'),
    );
  }
}

// Container.
const GQL_MODAL = gql`
  query Modal {
    modal @client {
      show
      title
      content
    }
  }
`;

const GQL_CLOSE_MODAL = gql`
  mutation CloseModal {
    modalToggle @client
  }
`;

export default _compose(
  graphql(
    GQL_MODAL,
    {
      props: ({ data: { modal } }) => ({
        modal,
      }),
    },
  ),
  graphql(
    GQL_CLOSE_MODAL,
    {
      props: ({ mutate }) => ({
        closeModal: mutate,
      }),
    },
  ),
)(ModalMarkup);

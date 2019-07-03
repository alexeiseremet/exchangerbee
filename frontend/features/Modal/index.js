import './styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { gql } from 'apollo-boost';
import { compose, graphql } from 'react-apollo';

import Svg from '../Svg';
import iconClose from '../../assets/images/icon-close.svg?sprite';

export class ModalMarkup extends React.Component {
  constructor(props) {
    super(props);
    this.backdrop = React.createRef();
    this.inner = React.createRef();
  }

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
    const { show, title, content } = modal;

    if (!show) {
      return null;
    }

    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal__backdrop"
             ref={this.backdrop}
             onClick={this.handleOutsideClick}
        >
          <div className="modal__inner"
               ref={this.inner}
               onKeyDown={this.handleKeyDown}
               tabIndex="-1"
          >
            <div className="modal__header">
              <h3 className="modal__title">{title}</h3>
              <button className="modal__btn-close"
                      type="button"
                      onClick={closeModal}
              >
                <Svg glyph={iconClose.id}/>
              </button>
            </div>
            <div className="modal__content">
              {content}
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('modal-portal')
    )
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

export default compose(
  graphql(
    GQL_MODAL,
    {
      props: ({ data: { modal } }) => ({
        modal,
      }),
    }
  ),
  graphql(
    GQL_CLOSE_MODAL,
    {
      props: ({ mutate }) => ({
        closeModal: mutate,
      })
    }
  ),
)(ModalMarkup);


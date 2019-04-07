import './styles.scss'
import React from 'react'

import { hideModal } from './actions'

import Svg from 'Features/Svg'
import iconClose from 'Images/icon-close.svg?sprite'

export class ModalMarkup extends React.Component {
  constructor (props) {
    super(props)
    this.backdrop = React.createRef()
    this.inner = React.createRef()
  }

  /**
   * Close Modal on press escape keyboard.
   *
   * @param {object} event Event object currently being handled.
   */
  static handleKeyDown (event) {
    if (event.keyCode === 27) {
      event.stopPropagation()
      this.props.hideModal()
    }
  }

  /**
   * Close Modal when click on backdrop element.
   *
   * @param {Object} event Event object currently being handled.
   */
  static handleOutsideClick (event) {
    if (event.target === this.backdrop.current) {
      this.props.hideModal()
    }
  }

  /**
   * Focus Modal after show to activate keyDown handler.
   */
  componentDidUpdate () {
    this.props.show && this.inner.current.focus()
  }

  render () {
    const {show, title, content, hideModal} = this.props
    if (!show) {
      return null
    }

    return (
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
                      onClick={hideModal}
              >
                <Svg glyph={iconClose.id}/>
              </button>
            </div>
            <div className="modal__content">
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Maps state to props.
 */
function mapStateToProps ({ModalState}) {
  return {...ModalState}
}

/**
 * Maps actions to props.
 */
function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {hideModal},
    dispatch
  )
}

export default ModalMarkup

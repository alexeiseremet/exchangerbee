import './styles.scss'
import React from 'react'
import Router from 'next/router'

import Modal from '../Modal'
import Header from './_header'
import Content from './_content'
import Footer from './_footer'

class Layout extends React.Component {
  /**
   * Scroll page to #layout or to element with id === hash.
   */
  static triggerScroll () {
    const {hash} = window.location

    if (!!hash) {
      document
        .querySelector(hash)
        .scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
    } else {
      document.querySelector('#layout').scrollTop = 0
    }
  }

  componentDidMount () {
    // Add event listener on route change.
    Router.router.events.on('routeChangeComplete', this.triggerScroll)
  }

  componentWillUnmount () {
    // Remove event listener on route change.
    Router.router.events.off('routeChangeComplete', this.triggerScroll)
  }

  render () {
    const {children} = this.props

    return (
      <div className="layout" id="layout">
        <Header/>
        <Content>{children}</Content>
        <Footer/>
        <Modal/>
      </div>
    )
  }
}

export default Layout

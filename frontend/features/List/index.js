import './styles.scss'
import React from 'react'

export default ({type, children}) => {
  switch (type) {
    case 'dl':
      return (
        <dl>{children}</dl>
      )

    case 'ordered':
      return (
        <ol className="ordered-list">{children}</ol>
      )

    case 'unordered':
    default:
      return (
        <ul className="unordered-list">{children}</ul>
      )
  }
}


import React from 'react'
import { showFormattedDate } from '../utils/index'

class Card extends React.Component {

  constructor (props) {
    super (props)

    this.state = {
      buttonText : this.setButtonText()
    }
  }

  setButtonText() {
    return (this.props.note.archived) ? 'Aktifkan' : 'Arsipkan'
  }
  
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.note.title}</h5>
          <small className='d-block mb-3'>{showFormattedDate(this.props.note.createdAt)}</small>
          <p className="card-text">{this.props.note.body}</p>
          <span className="btn btn-primary">{this.state.buttonText}</span>
        </div>
      </div>
    )
  }
}

export default Card
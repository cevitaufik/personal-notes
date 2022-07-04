import React from 'react'
import { getInitialData } from '../utils/index'
import ActiveNotes from './activeNotes'
import Navbar from './navbar'

class PersonalNotes extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      notes : getInitialData()
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <ActiveNotes notes={this.state.notes}/>
      </div>
    )
  }
}

export default PersonalNotes
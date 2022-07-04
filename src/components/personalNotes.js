import React from 'react'
import { getInitialData } from '../utils/index'
import Notes from './notes'
import Navbar from './navbar'

class PersonalNotes extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      notes : getInitialData(),
      activeNotes : this.getActiveNotes(),
      archivedNotes : [],
    }

    this.onChangeStatus = this.onChangeStatus.bind(this)
  }

  getActiveNotes() {
    const activeNotes = []

    getInitialData().map(note => {
      if(!note.archived) {
        activeNotes.push(note)
      }
    })

    return activeNotes
  }

  onChangeStatus(noteId) {
    let newNotes = this.state.notes
    let newActiveNotes = []
    let newArchivedNotes = []

    newNotes.map((note, index) => {
      if(note.id === noteId) {
        newNotes[index].archived = (newNotes[index].archived) ? false : true
      }
    })

    newNotes.map(note => {
      if (!note.archived) {
        newActiveNotes.push(note)
      } else {
        newArchivedNotes.push(note)
      }
    })

    this.setState({
      activeNotes: newActiveNotes,
      archivedNotes: newArchivedNotes
    })
  }

  render() {
    return (
      <div className='bg-secondary bg-opacity-10 pb-5'>
        <Navbar />
        <Notes 
          notes={this.state.activeNotes}
          title={'Catatan aktif'}
          changeStatus={this.onChangeStatus}
        />
        <Notes 
          notes={this.state.archivedNotes}
          title={'Arsip catatan'}
          changeStatus={this.onChangeStatus}
        />
      </div>
    )
  }
}

export default PersonalNotes
import React from 'react';
import { getInitialData } from '../utils/index'
import Card from './card';

class ActiveNotes extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      notes : this.getActiveNote()
    }
  }

  getActiveNote() {
    const activeNotes = []

    this.props.notes.map(data => {
      if (!data.archived) {
        activeNotes.push(data)
      }
    })

    return activeNotes
  }

  render () {
    if (!this.state.notes.length) {
      return (
        <ActiveNotesHeader>
          <h2>Belum ada catatan</h2>
        </ActiveNotesHeader>
        )
    }

    return (
      <ActiveNotesHeader>
         {this.state.notes.map(note => {
            return (
              <div key={note.id} className="col-md-12">
                <Card note={note} />
              </div>
            )
          })}
      </ActiveNotesHeader>
    )
  }
}

function ActiveNotesHeader({children}) {
  return(
    <div className='container my-5'>
      <h1 className='mb-4'>Daftar catatan aktif</h1>
      <div className="row g-3">
        {children}
      </div>
    </div>
  )
}

export default ActiveNotes
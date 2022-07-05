import React from 'react'
import { getInitialData } from '../utils/index'
import Notes from './notes'
import Navbar from './navbar'
import Form from './form'

class PersonalNotes extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      notes : getInitialData(),
      activeNotes : this.getActiveNotes(),
      archivedNotes : [],

      newNote: {
        id : '',
        title : '',
        body : '',
        createdAt : '',
        arcived : false,
      }
    }

    this.onChangeStatus = this.onChangeStatus.bind(this)

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleArcivedChange = this.handleArcivedChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

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

  updateCategory(notes) {
    let newActiveNotes = []
    let newArchivedNotes = []

    notes.map(note => {
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

  onChangeStatus(noteId) {
    let newNotes = this.state.notes

    newNotes.map((note, index) => {
      if(note.id === noteId) {
        newNotes[index].archived = (newNotes[index].archived) ? false : true
      }
    })

    this.updateCategory(newNotes)
  }

  handleTitleChange(e) {
    this.setState(prevState => ({
      ...prevState,
      newNote: {
        ...prevState.newNote,
        title : e.target.value
      }
    }))
  }

  handleBodyChange(e) {
    this.setState(prevState => ({
      ...prevState,
      newNote: {
        ...prevState.newNote,
        body : e.target.value
      }
    }))
  }

  handleArcivedChange(e) {
    this.setState(prevState => ({
      ...prevState,
      newNote: {
        ...prevState.newNote,
        arcived : e.target.checked
      }
    }))
  }

  handleSubmit(e) {
    e.preventDefault()
    let date = new Date()

    this.setState(prevState => ({
      ...prevState,
      newNote: {
        ...prevState.newNote,
        createdAt : date.toISOString()
      }
    }))

    this.setState(prevState => ({
      ...prevState,
      newNote: {
        ...prevState.newNote,
        id : Date.now()
      }
    }))

    let tmp = this.state.notes
    tmp.push(this.state.newNote)
    this.setState({notes: tmp})

    this.updateCategory(this.state.notes)
  }

  render() {
    return (
      <div className='bg-secondary bg-opacity-10 pb-5'>
        <Navbar />
        <Form 
          newNote={this.state.newNote}
          onSubmit={this.handleSubmit}
          onTitleChange={this.handleTitleChange}
          onBodyChange={this.handleBodyChange}
          onArcivedChange={this.handleArcivedChange}
        />
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
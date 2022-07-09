import React from 'react'
import { getInitialData } from '../utils/index'
import Notes from './notes'
import Navbar from './navbar'
import Form from './form'
import SearchBox from './searchBox'

class PersonalNotes extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      notes : getInitialData(),
      activeNotes : this.getActiveNotes(),
      archivedNotes : [],
      titleLength : 0,
      titleMaxLength : 50,
      keyword : '',

      newNote: {
        id : '',
        title : '',
        body : '',
        createdAt : '',
        archived : false,
      }
    }

    this.onChangeStatus = this.onChangeStatus.bind(this)

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleArchivedChange = this.handleArchivedChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onDeleteNote = this.onDeleteNote.bind(this)
    this.onChangeKeyword = this.onChangeKeyword.bind(this)
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
    let length = e.target.value.length
    this.titleLengthCounter(length)

    if (this.state.titleLength > this.state.titleMaxLength) {
      return alert('Judul catatan terlalu panjang')
    }

    this.setState(prevState => ({
      ...prevState,
      newNote: {
        ...prevState.newNote,
        title : e.target.value
      }
    }))

    this.createId()
    this.createCreatedAt()
  }

  titleLengthCounter(length) {
    this.setState({titleLength : length})
  }

  titleLengthCounterReset() {
    this.setState({titleLength : 0})
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

  handleArchivedChange(e) {
    this.setState(prevState => ({
      ...prevState,
      newNote: {
        ...prevState.newNote,
        archived : e.target.checked
      }
    }))
  }

  createId() {
    this.setState(prevState => ({
      ...prevState,
      newNote: {
        ...prevState.newNote,
        id : Date.now()
      }
    }))
  }

  createCreatedAt() {
    let date = new Date()
    date = date.toISOString()

    this.setState(prevState => ({
      ...prevState,
      newNote: {
        ...prevState.newNote,
        createdAt : date,
      }
    }))
  }

  resetNewNote() {
    this.setState({newNote : {
      id : '',
        title : '',
        body : '',
        createdAt : '',
        archived : false,
    }})
  }

  handleSubmit(e) {
    e.preventDefault()

    let tmp = this.state.notes
    tmp.unshift(this.state.newNote)

    this.setState({notes: tmp})

    this.resetNewNote()
    this.titleLengthCounterReset()
    this.updateCategory(this.state.notes)
  }

  onDeleteNote(noteId) {
    let tmp = this.state.notes

    tmp.map((note, index) => {
      if(note.id === noteId) {
        tmp.splice(index, 1)
      }
    })

    this.setState({notes: tmp})
    this.updateCategory(this.state.notes)
  }

  onChangeKeyword(e) {
    this.setState({keyword : e.target.value})
    let tmp = []

    this.state.notes.map((note, index) => {
      if (note.title.toLowerCase().includes(this.state.keyword.toLowerCase())) {
        tmp.push(this.state.notes[index])
      }
    })

    this.updateCategory(tmp)

    if (this.state.keyword.trim().length <= 1) {
      this.updateCategory(this.state.notes)
    }    
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
          onArchivedChange={this.handleArchivedChange}
          titleLength={this.state.titleLength}
          titleMaxLength={this.state.titleMaxLength}
        />

        <SearchBox 
          keyword={this.state.keyword}
          onChangeKeyword={this.onChangeKeyword}
        />

        <Notes 
          notes={this.state.activeNotes}
          title={'Catatan aktif'}
          changeStatus={this.onChangeStatus}
          deleteNote={this.onDeleteNote}
        />

        <Notes 
          notes={this.state.archivedNotes}
          title={'Arsip catatan'}
          changeStatus={this.onChangeStatus}
          deleteNote={this.onDeleteNote}
        />
      </div>
    )
  }
}

export default PersonalNotes
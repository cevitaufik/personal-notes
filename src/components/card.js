import React from 'react'
import { showFormattedDate } from '../utils/index'

export default function Card({note, changeStatus, deleteNote}) {
  let buttonText = (note.archived) ? 'Aktifkan' : 'Arsipkan'
  
  return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <small className='d-block mb-3'>{showFormattedDate(note.createdAt)}</small>
          <p className="card-text">{note.body}</p>
          <span className="btn btn-primary"
                onClick={() => changeStatus(note.id)}>
            {buttonText}
          </span>
          <span className="btn btn-danger ms-2"
                onClick={() => deleteNote(note.id)}>
            Hapus
          </span>
        </div>
      </div>
  )
}
import React from 'react';
import Card from './card';

export default function Notes({notes = null, title, changeStatus}) {
  if (notes.length >= 1) {
    return (
      <Header title={title} >
        {notes.map(note => {
          return (
            <div key={note.id} className="col-md-12">
              <Card 
                note={note}
                title={title}
                changeStatus={() => changeStatus(note.id)}
              />
            </div>
          )
        })}
      </Header>
    )
  } else {
    return (
      <Header title={title} >
        <h3>Tidak ada data</h3>
      </Header>
    )
  }
}

function Header({children, title}) {
  return (
    <div className='container my-5 bg-white rounded'>
      <div className='p-3'>
        <h1 className='mb-4'>{title}</h1>
        <div className="row g-3">
          { children }
        </div>
      </div>
    </div>
  )
}
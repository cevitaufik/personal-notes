import React from 'react'

export default function SearchBox({keyword, onChangeKeyword}) {
  return (
    <div className='container bg-white rounded my-5 p-4'>
      <div className='row'>
        <div className='col-12'>
          <h1 className='mb-4'>Pencarian</h1>
        </div>
        <div className="col-12">
          <input type="text" 
                  className="form-control" 
                  placeholder='Judul catatan' 
                  onChange={(e) => onChangeKeyword(e)}
                  value={keyword}/>
        </div>
      </div>
    </div>
  )
}
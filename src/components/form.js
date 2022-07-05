import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleArcivedChange = this.handleArcivedChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTitleChange(e) {
    this.props.onTitleChange(e)
  }

  handleBodyChange(e) {
    this.props.onBodyChange(e)  
  }

  handleArcivedChange(e) {
    this.props.onArcivedChange(e)
  }

  handleSubmit(e) {
    this.props.onSubmit(e)
  }

  render () {
    return (
      <form className='container my-5 bg-white rounded p-4'
            onSubmit={this.handleSubmit}>
        <h1 className='mb-4'>Tambah catatan</h1>
        <div className='mb-3'>
          <label htmlFor="title" className='form-label'>Title</label>
          <input type="text" 
                  className='form-control' 
                  id="title" 
                  placeholder="Judul" 
                  value={this.props.newNote.title}
                  onChange={this.handleTitleChange}/>
        </div>
        <div className='mb-3'>
          <label htmlFor="body" className='form-label'>Catatan</label>
          <textarea className="form-control" 
                    id="body" 
                    rows="3"
                    value={this.props.newNote.body}
                    onChange={this.handleBodyChange}>
          </textarea>
        </div>
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" 
                  type="checkbox" 
                  role="switch" 
                  id="arcived" 
                  checked={this.props.newNote.arcived}
                  onChange={this.handleArcivedChange}/>
          <label className="form-check-label" 
                  htmlFor="arcived">
            Arsipkan
          </label>
        </div>
        <div className='d-flex'>
          <button type="submit" className="ms-auto btn btn-primary">Simpan</button>
        </div>
      </form>
    )
  }
}

export default Form
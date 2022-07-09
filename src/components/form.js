import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleArchivedChange = this.handleArchivedChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.titleIsTooLong = this.titleIsTooLong.bind(this)
    this.titleIsEmpty = this.titleIsEmpty.bind(this)
    this.bodyIsEmpty = this.bodyIsEmpty.bind(this)
  }

  handleTitleChange(e) {
    this.props.onTitleChange(e)
  }

  handleBodyChange(e) {
    this.props.onBodyChange(e)  
  }

  handleArchivedChange(e) {
    this.props.onArchivedChange(e)
  }

  handleSubmit(e) {
    this.props.onSubmit(e)
  }

  titleIsTooLong() {
    return this.props.titleLength > this.props.titleMaxLength
  }

  bodyIsEmpty() {
    return (!this.props.newNote.body.length) ? true : false
  }

  titleIsEmpty() {
    return (!this.props.newNote.title.length) ? true : false
  }

  render () {
    return (
      <form className='container my-5 bg-white rounded p-4'
            onSubmit={this.handleSubmit}>
        <h1 className='mb-4'>Tambah catatan</h1>
        <div className='mb-3'>
          <label htmlFor="title" className='form-label'>Judul 
            <span className='text-danger'>*</span>
          </label>
          <input type="text" 
                  className={'form-control '
                  + ((this.titleIsTooLong()) ? 'is-invalid' : '')}
                  id="title" 
                  placeholder="Judul" 
                  value={this.props.newNote.title}
                  onChange={this.handleTitleChange}/>
          <div className='d-flex'>
            <div className={'invalid-feedback '
                  + ((this.props.titleLength <= this.props.titleMaxLength) ? 'd-none' : 'd-block')}>
              Judul catatan terlalu panjang.
            </div>
            <small className='text-muted d-block ms-auto'>{this.props.titleLength}/{this.props.titleMaxLength}</small>
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor="body" className='form-label'>
            Catatan
            <span className='text-danger'>*</span>
          </label>
          <textarea className='form-control ' 
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
                  id="archived" 
                  checked={this.props.newNote.archived}
                  onChange={this.handleArchivedChange}/>
          <label className="form-check-label" 
                  htmlFor="archived">
            Arsipkan
          </label>
        </div>
        <div className='d-flex'>
          <button type="submit" 
                  className={'ms-auto btn btn-primary '
                  + ((this.titleIsEmpty() || this.titleIsTooLong() || this.bodyIsEmpty()) 
                  ? 'disabled' : '')}
                  >
            Simpan
          </button>
        </div>
      </form>
    )
  }
}

export default Form
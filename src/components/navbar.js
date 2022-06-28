import React from 'react';

class Navbar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      keyword : ''
    }

    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this)
    this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this)
  }

  onSubmitEventHandler(event) {
    event.preventDefault()
    console.log(this.state.keyword);
  }

  onKeywordChangeEventHandler(event) {
    this.setState(() => {
      return {
        keyword : event.target.value
      }
    })
  }

  render () {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand">Personal notes</span>
          <button className="navbar-toggler" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#navbarSupportedContent" 
                  aria-controls="navbarSupportedContent" 
                  aria-expanded="false" 
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex ms-auto" 
                  role="search"
                  onSubmit={this.onSubmitEventHandler}>
              <input className="form-control me-2" 
                      type="search" 
                      placeholder="Search" 
                      aria-label="Search" 
                      value={this.state.keyword}
                      onChange={this.onKeywordChangeEventHandler}/>
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
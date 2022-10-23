// Write your JS code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import './index.css'

class Home extends Component {
  state = {username: '', usersList: []}

  onChangePage = () => {
    const {usersList} = this.state

    localStorage.setItem('userdata', JSON.stringify(usersList))
    const {history} = this.props
    history.replace('/task')
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {username, usersList} = this.state
    if (username !== '') {
      const userData = {id: uuidv4(), name: username}
      this.setState({usersList: [...usersList, userData]}, this.onChangePage)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const {username} = this.state
    return (
      <div className="form-main-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <label htmlFor="Username" className="label">
            Username
          </label>
          <input
            type="text"
            value={username}
            className="username"
            id="Username"
            placeholder="Enter your name"
            onChange={this.onChangeUsername}
          />
          <button type="submit" className="button">
            Enter
          </button>
        </form>
      </div>
    )
  }
}
export default Home

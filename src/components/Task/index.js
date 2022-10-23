import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {MdDeleteOutline} from 'react-icons/md'
import './index.css'

class Task extends Component {
  state = {isCompleted: false, taskValue: '', latestTask: ''}

  onChangeRoute = () => {
    const {history} = this.props
    history.replace('/alltask')
  }

  addTodoButton = () => {
    const data = localStorage.getItem('userdata')
    const parsedTodoList = JSON.parse(data)
    const Length = parsedTodoList.length
    console.log(parsedTodoList[Length - 1].id)

    const {taskValue} = this.state
    if (taskValue !== '') {
      this.setState({
        latestTask: taskValue,
        taskValue: '',
        isCompleted: false,
      })
    }
  }

  addSaveButton1 = () => {
    const {latestTask, isCompleted} = this.state
    const data = localStorage.getItem('userdata')
    const parsedTodoList = JSON.parse(data)
    const Length = parsedTodoList.length
    const userName = parsedTodoList[Length - 1].name

    const taskDetails = {
      id: uuidv4(),
      username: userName,
      taskname: latestTask,
      isChecked: isCompleted,
    }

    const taskListData = localStorage.getItem('taskdata')
    const parseData = JSON.parse(taskListData)
    console.log(parseData)
    if (parseData !== null) {
      const upDatedData = [...parseData, taskDetails]

      localStorage.setItem('taskdata', JSON.stringify(upDatedData))
    } else {
      localStorage.setItem('taskdata', JSON.stringify([taskDetails]))
    }
  }

  onChangeTaskValue = event => {
    this.setState({taskValue: event.target.value})
  }

  onChangeCheckValue = () => {
    this.setState(prevState => ({
      isCompleted: !prevState.isCompleted,
    }))
  }

  onDeleteTodo = () => {
    this.setState({isCompleted: false, taskValue: '', latestTask: ''})
  }

  renderTaskList = () => {
    const {isCompleted, latestTask} = this.state

    const containerClassName = isCompleted
      ? 'label-task-container1'
      : 'label-task-container'
    const labelClassName = isCompleted ? 'checked' : 'checkbox-label'

    if (latestTask !== '') {
      return (
        <li className="label-container">
          <input
            type="checkbox"
            value={isCompleted}
            checked={isCompleted}
            className="checkbox-input "
            placeholder="What needs to be done?"
            onChange={this.onChangeCheckValue}
          />
          <div className={`${containerClassName}`}>
            <p className={`${labelClassName}`}>{latestTask}</p>
            <button
              type="button"
              className="delete-icon-container"
              onClick={this.onDeleteTodo}
            >
              <MdDeleteOutline className="delete-icon" />
            </button>
          </div>
        </li>
      )
    }
    return null
  }

  render() {
    const {taskValue} = this.state

    return (
      <div className="todos-bg-container">
        <div>
          <h1 className="todos-heading">Todos</h1>
          <h1 className="create-task-heading">
            Create <span className="create-task-heading-subpart">Task</span>
          </h1>
          <input
            type="text"
            value={taskValue}
            className="todo-user-input"
            placeholder="What needs to be done?"
            onChange={this.onChangeTaskValue}
          />
          <div className="label-container">
            <button
              type="button"
              className="button"
              onClick={this.addTodoButton}
            >
              Add
            </button>
            <button
              type="button"
              className="button"
              onClick={this.addSaveButton1}
            >
              Save
            </button>
          </div>

          <ul className="todo-items-container" id="todoItemsContainer">
            {this.renderTaskList()}
          </ul>
          <button
            type="button"
            className="showAll"
            onClick={this.onChangeRoute}
          >
            Show All
          </button>
        </div>
      </div>
    )
  }
}
export default Task

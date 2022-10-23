import {Component} from 'react'
import {MdDeleteOutline} from 'react-icons/md'
import './index.css'

class AllTasks extends Component {
  state = {isShow: false}

  onDeleteTodo = () => {
    localStorage.removeItem('taskdata')
  }

  showAllTask = name => {
    const data = localStorage.getItem('taskdata')
    const parsedTodoList = JSON.parse(data)

    console.log(parsedTodoList)
    if (data !== null) {
      const requstedData = parsedTodoList.filter(
        eachTask => eachTask.username === name,
      )

      return (
        <ul>
          {requstedData.map(eachtask => {
            const checkedValue = eachtask.isCompleted

            const containerClassName = checkedValue
              ? 'label-task-container'
              : 'label-task-container'
            const labelClassName = checkedValue ? 'checked' : 'checkbox-label'
            return (
              <li className="label-container" key={eachtask.id}>
                <input
                  type="checkbox"
                  value={checkedValue}
                  checked={checkedValue}
                  className="checkbox-input "
                  onChange={this.onChangeCheckValue}
                />
                <div className={`${containerClassName}`}>
                  <p className={`${labelClassName}`}>{eachtask.taskname}</p>
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
          })}
        </ul>
      )
    }
    return <h1 className="list-heading">No Tasks</h1>
  }

  onShowTodo = () => {
    this.setState(prevState => ({
      isShow: !prevState.isShow,
    }))
  }

  getUserData = () => {
    const {isShow} = this.state
    const text = isShow ? 'close tasks' : 'show tasks'

    const data = localStorage.getItem('userdata')
    const parsedTodoList = JSON.parse(data)

    return (
      <ul>
        {parsedTodoList.map(eachUser => (
          <>
            <li key={eachUser.id} className="list-card">
              <h1 className="list-heading">{eachUser.name}</h1>
              <button
                type="button"
                className="button2"
                onClick={this.onShowTodo}
              >
                {text}
              </button>
            </li>
            {isShow ? this.showAllTask(eachUser.name) : null}
          </>
        ))}
      </ul>
    )
  }

  render() {
    return <div className="form-main-container">{this.getUserData()}</div>
  }
}
export default AllTasks

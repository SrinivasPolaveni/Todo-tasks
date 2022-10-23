import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Task from './components/Task'
import AllTaks from './components/AllTaks'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/task" component={Task} />
    <Route exact path="/alltask" component={AllTaks} />
  </Switch>
)

export default App

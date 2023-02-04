import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import ActivitiesCreate from "./components/ActivitiesCreate";
import Detail from './components/Detail';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/"

function App() {
  return (
    <BrowserRouter>
    <div >
        <div className='App'>
        <Switch>
          <Route exact path= '/' component= {LandingPage}/>
          <Route path = '/home' component= {Home}/>
          <Route path = '/activities' component= {ActivitiesCreate}/>
          <Route path = '/detail/:id' component= {Detail}/>
        </Switch>     
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
import React from "react";
import Users from "./components/users";
import UserDetail from "./components/user_detail";
import UserPresence from "./components/user_presence";
import Nav from "./components/nav";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={Users} />
            <Route path="/users/:id" component={UserDetail} />
            <Route path="/presense/today" component={UserPresence} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

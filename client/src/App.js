import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import AlertLayout from "./components/layout/AlertLayout";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// Material-UI elements
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Container className="App">
          <CssBaseline />
          <Route exact path="/" component={Home} />
          <section className="container">
            <AlertLayout />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "../components/Header";
import Board from "./Board";
import LoginForm from "../components/Login";
import { validateUserSession } from "../helpers/validations";


const Routes = () => {
  const [isUserValid, setIsUserValid] = useState(false);
  useEffect(() => {
    async function validation() {
      const isSessionValid = await validateUserSession();
      setIsUserValid(isSessionValid);
    }
    validation();
  }, []);

  return (
    <>
    <Router>
      <Route path="/">
        <Header isLoggedIn={isUserValid} />
        <Switch>
          <Route path="/auth/login">
            <LoginForm />
          </Route>
          <Route path="/board">
            <Board />
          </Route>
        </Switch>
      </Route>
      {!isUserValid ? (
        <Redirect from="/" to="/auth/login" />
      ) : (
        <Redirect from="/" to="/Board" />
      )}
    </Router>
    </>
  );
};

export default Routes;

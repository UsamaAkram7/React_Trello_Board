import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { LoginContainer } from "../styles/LoginStyle";
import { validateUser } from "../helpers/validations";
import Routes from "../containers/Routes";

const LoginForm = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onHide, setOnHide] = useState(true);

  const handleClose = () => {
    setOnHide(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = document.forms[0];
    const isSignedIn = await validateUser(email.value, password.value);
    if (!isSignedIn) {
      setErrorMessages({
        name: "error",
        message: "Email or Password is not Correct",
      });
      setOnHide(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <>
      {isLoggedIn ? (
        <Routes />
      ) : (
        <LoginContainer>
          <div className="login-form">
            <div className="title">Sign In</div>
            {renderForm}
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={!onHide}
              autoHideDuration={60000}
              onClose={handleClose}
            >
              <Alert
                variant="filled"
                onClose={handleClose}
                severity={errorMessages.name}
                sx={{
                  width: "100%",
                }}
              >
                {errorMessages.message}
              </Alert>
            </Snackbar>
          </div>
        </LoginContainer>
      )}
    </>
  );
};

export default LoginForm;

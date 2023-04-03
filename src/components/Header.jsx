import React, { useState } from "react";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import {
  HeaderContainer,
  HeaderLogoContainer,
  HeaderIconsContainer,
  HeaderLogo,
} from "../styles/Header.styles";
import logo from "../assets/trello-logo.png";
import IconButton from "./IconButton";
import { CARD_APIS_URL } from "../api/apiRoutes";

const Header = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [type, setType] = useState("");
  const [toastMessage, setToastMessage] = useState("Don't Forget to Save Changes Before Leaving.");

  const handleClose = async () => {
    setShowToast(false);
    setShowAlert(false);
    setToastMessage("");
  };
  const updateCardsDetails = async () => {
    axios.put(`${CARD_APIS_URL}/update/all`, { lists: props.lists }).then(
      (response) => {
        setShowToast(true);
        setType("success");
        setToastMessage("Yay! Your Changes Have Been Saved Successfully.");
      },
      (err) => {
        setShowToast(true);
        setType("error");
        setToastMessage("Error! Could Not Save Your Changes");
      }
    );
  };

  return (
    <HeaderContainer>
      <HeaderLogoContainer>
        <Link to="/board">
          <HeaderLogo src={logo} />
        </Link>
        {props.isLoggedIn &&(
          <HeaderIconsContainer>
          <IconButton
            fontSize="20px"
            onClick={updateCardsDetails}
            iconType="save"
          />
        </HeaderIconsContainer>
        )}
        
      </HeaderLogoContainer>
      <Snackbar anchorOrigin={{ vertical:'bottom', horizontal: 'center' }} open={showToast} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {toastMessage}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical:'bottom', horizontal: 'center' }} open={showAlert && props.isLoggedIn} autoHideDuration={6000} onClose={handleClose}  key={'top', 'right'}>
        <Alert variant="filled" onClose={handleClose} severity='info' sx={{ width: "100%"}}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </HeaderContainer>
  );
};

Header.propTypes = {
  lists: PropTypes.array,
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  lists: state.board.lists,
});

export default connect(mapStateToProps)(Header);

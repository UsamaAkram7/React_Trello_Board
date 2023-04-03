import axios from "axios";
import { USER_APIS_URL } from "../api/apiRoutes";
import { saveState, loadState } from "./localStorage";
export const validateUser = async (userEmail, userPassword) => {
  let validated = false;
  await axios
    .get(`${USER_APIS_URL}/signIn`, {
      headers: {
        email: userEmail,
        password: userPassword,
      },
    })
    .then(async (response) => {
      const user = {
        userEmail: response.data.userEmail,
        token: response.data.token,
      };
      await saveState(user);
      validated = true;
    })
    .catch((error) => {
      console.log("Error", error);
    });
  return validated;
};

export const validateUserSession = async () => {
  let validated = false;
  const user = await loadState();
  await axios
    .get(`${USER_APIS_URL}/validate`, {
      headers: {
        X_AUTH_TOKEN: user.token,
      },
    })
    .then((response) => {
        validated = true;
    })
    .catch((error) => {
      console.log("Error", error);
    });
  return validated;
};

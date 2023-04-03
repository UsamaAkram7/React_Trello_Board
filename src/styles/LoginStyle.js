import styled from 'styled-components';
import { device } from './devices';

export const LoginContainer = styled.div`
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;

  /* height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  grid-template-columns: repeat(${props => props.countColumns}, 1fr);
  grid-gap: 13px;
  margin: 10px;
  background-color: #f8f9fd;
  margin-top: 35px;
  @media device and ${device.tabletLandscape} {
    overflow-x: auto;
  } */

input[type="text"],
input[type="password"] {
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

input[type="submit"] {
  margin-top: 10px;
  cursor: pointer;
  font-size: 15px;
  background: #535C1F;
  border: 1px solid  #535C1F;
  color: #fff;
  padding: 10px 20px;
  border-radius: 3px;
}

input[type="submit"]:hover {
  background: #AFC241;
  border: 1px solid  #C6DB4A;
}

.button-container {
  display: flex;
  justify-content: center;
}

.login-form {
  background-color: 'transparent';
  padding: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.list-container {
  display: flex;
}

.error {
  color: #fff;
  font-size: 12px;
}

.title {
  font-size: 25px;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 10px;
}
`;
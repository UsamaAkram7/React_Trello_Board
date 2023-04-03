import styled from 'styled-components';
import { device } from './devices';

export const BoardContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 13px;
  margin: 10px;
  margin-top: 45px;
  padding: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media device and ${device.tabletLandscape} {
    overflow-x: auto;
  }
  
`;

export const Container = styled.div`
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  @media device and ${device.tabletLandscape} {
    overflow-x: auto;
  }
  
`;
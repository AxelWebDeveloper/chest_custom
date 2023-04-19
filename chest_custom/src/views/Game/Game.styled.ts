import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(65, 85, 108, 0.9);
`;

export const GameContainer = styled.div`
    width: auto;
`;

export const Players = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
`;

export const Player = styled.p`
  width: 20%;
  background-color: #1d3a59;
  padding: 10px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: transform 0.3s ease-out;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
  }
`;

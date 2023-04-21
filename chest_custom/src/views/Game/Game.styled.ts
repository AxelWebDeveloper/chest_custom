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
export const GameChat = styled.div`
  display: flex;
  flex-direction: row;
`;
export const ChatContainer = styled.div`
  display: flex;
  margin-left: 9%;
  `;


export const BlockChat = styled.div`
  display: flex;
  width: 500px;
  height: 100vh;
  background-color:#6382ab ;

`;

export const Chat = styled.div`
  background-color:#244569 ;
  opacity: 70%;
  width: 450px;
  height: 95vh;
  display: flex;
  align-items: flex-end;
  border-radius: 2%;
  align-content: center;
  margin-left: 6%;
  margin-top: 4%;
`;

export const Input = styled.input`
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  height: 15px;
  padding: 15px;
  box-sizing: border-box;
  margin-right: 5%;
  margin-bottom: 5%;
  display: flex;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px #007bff;
  }
`;


export const ChatMessagesContainer = styled.div`
  width: 100vw;
  height: 91vh;
  overflow-y: scroll;
`;

export const MessageContainer1 = styled.div`
  margin: 10px;
  padding: 10px;
  background-color: #376ff6;
  border-radius: 5px;
`;

export const Username1 = styled.div`
  font-weight: bold;
`;

export const Message1 = styled.div`
  margin-top: 5px;
`;

export const MessageContainer2 = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #FFFFFF;
`;
export const Username2 = styled.div`
  font-weight: bold;
`;
export const Message2 = styled.div`
  margin-top: 5px;
`;

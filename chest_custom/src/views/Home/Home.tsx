import React from 'react';
import styled from "styled-components";
import logo from "../../assets/logo.png"

const Home = () => {
    return (
        <BodyHome>
            <HomeContainer>
                <DivImage>
                    <Logo src={logo} />
                </DivImage>
                <DivButton>
                    <CreateGamePrivate>  Créer une game Public </CreateGamePrivate>
                    <JoinGamePrivate> Rejoindre une game Public </JoinGamePrivate>
                </DivButton>
            </HomeContainer>
        </BodyHome>
    );
};


const BodyHome = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #244569;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 500px;
  border: solid;
  background-color: #363d50;
`;
const DivImage = styled.div`
  display: flex;
  justify-content: center;
`;
const Logo = styled.img`
  width: 150px;
  height: 150px;
  margin-top: 10%;
`;
const DivButton = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  margin-top: 10%;
`;
const CreateGamePrivate = styled.button`
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const JoinGamePrivate = styled.button`
  width: 150px;
  height: 50px;
  margin-top: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Home;

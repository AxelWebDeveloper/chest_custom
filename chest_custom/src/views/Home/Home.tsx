import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styled from "styled-components";
import logo from "../../assets/logo.png"
import {io} from "socket.io-client";

type CreateGameFormData = {
    name: string;
    players: {
        firstName: string;
    };
};

const socket = io('http://localhost:3000');

const Home = () => {
    const [formData, setFormData] = useState<CreateGameFormData>({
        name: '',
        players: {
            firstName: 'Axel'
        },
    });
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        socket.on('gameCreated', (game) => setData([...data, game]));
    }, [socket, data]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        socket.emit('createGame', formData);
    };

    return (
        <BodyHome>
            <HomeContainer>
                <DivImage>
                    <Logo src={logo} />
                </DivImage>
                <ListButton>
                    <Button>Créer une partie</Button>
                    <Button>Rejoindre une partie</Button>
                    <Button>Ajouter un ami</Button>
                </ListButton>
            </HomeContainer>
            <HomeContainer>
                <h2>Créer une partie</h2>
                <Form onSubmit={handleSubmit}>
                    <FormItem>
                        <label style={{ color: '#fff', marginRight: '20px' }} htmlFor="name">Nom de la partie</label>
                        <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </FormItem>
                    <Button style={{ marginTop: '40px' }} type="submit">Créer la partie</Button>
                </Form>
            </HomeContainer>
            <HomeContainer>
                <h2>Liste des parties</h2>
                <ListGame>
                    <>
                        {data.map((game: any) => {
                            return (
                                <Game key={game.id}>
                                    <img src={logo} alt={'logo'} width={60} style={{ borderRadius: '5px' }} />
                                    <p>{game.name} | 1/2</p>
                                    <JoinButton>Rejoindre</JoinButton>
                                </Game>
                            )
                        })}
                    </>
                </ListGame>
            </HomeContainer>
        </BodyHome>
    );
};


const BodyHome = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #24272f;
  @media (max-width: 992px) {
    flex-direction: column;
    min-height: 100vh;
    height: auto;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 500px;
  padding-top: 50px;
  background-color: #25374b;
  box-shadow: rgba(173, 173, 175, 0.25) 0px 2px 5px -1px, rgba(241, 241, 241, 0.3) 0px 1px 3px -1px;
  
  h2 {
    color: #fff;
  }
  
  @media (max-width: 992px) {
    margin: 50px;
  }
`;
const DivImage = styled.div`
  display: flex;
  justify-content: center;
`;
const Logo = styled.img`
  width: 150px;
  height: 150px;
  margin-top: 10%;
  border-radius: 7px;
`;
const ListButton = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  width: 70%;
`;
const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #40ab7f;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
    &:hover {
        background-color: #3c9d6f;
    }
`;

const Form = styled.form`
    width: 80%;
`;

const FormItem = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 25px 0 0 0;
`;

const Input = styled.input`
  background-color: #2b425b;
  border: 2px solid #365373;
  padding: 8px;
  border-radius: 6px;
  color: #4276af;
`;

const ListGame = styled.div`
  margin-top: 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Game = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #315072;
  border-radius: 5px;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
  p {
    color: #fff;
  }
`;

const JoinButton = styled(Button)`
  width: 20%;
  font-size: 14px;
  margin: 0 10px 0 0;
`;

export default Home;

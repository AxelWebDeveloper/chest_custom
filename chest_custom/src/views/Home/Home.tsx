import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styled from "styled-components";
import logo from "../../assets/logo.png"
import {io} from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

type CreateGameFormData = {
    name: string;
    uuid: string;
    user: object;
};

const socket = io('http://localhost:3000');

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<any>([]);
    const [formData, setFormData] = useState<CreateGameFormData>({
        name: '',
        uuid: '',
        user: {},
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token !== null) {
            const parsedToken = JSON.parse(token);

            const fetchGames = async () => {
                const games = await axios.get('http://localhost:3000/games', {
                    headers: {
                        Authorization: `Bearer ${parsedToken.jwtToken}`
                    }
                });

                setData(games.data);
            };

            fetchGames();
        } else {
            console.error('No token found');
        }
    }, [])

    useEffect(() => {
        socket.on('gameCreated', (game) => {
            setData([...data, game])
        });
        socket.on('gameUpdated', (game) => {
            setData((prevData: any[]) => prevData.filter((g) => g.id !== game.id));
        });
    }, [socket, data]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const getUser = async () => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            const parsedToken = JSON.parse(token);
            const user = await axios.get('http://localhost:3000/users/me', {
                headers: {
                    Authorization: `Bearer ${parsedToken.jwtToken}`
                }
            });

            return user.data;
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = await getUser();
        formData.uuid = uuidv4();
        formData.user = user;
        socket.emit('createGame', formData);
        navigate(`/game/${formData.uuid}`, { replace: true })
    };

    const handleJoinGame = async (game: any) => {
        const user = await getUser();
        const joinData = {
            game: game,
            user: user,
        }
        socket.emit('joinGame', joinData);
        navigate(`/game/${game.uuid}`, { replace: true });
    }

    return (
        <BodyHome>
            <HomeContainer>
                <DivImage>
                    <Logo src={logo} />
                </DivImage>
                <ListButton>
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
                                    <JoinButton onClick={() => handleJoinGame(game)}>Rejoindre</JoinButton>
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
  overflow: scroll;
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

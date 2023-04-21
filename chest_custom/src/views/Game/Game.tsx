// @ts-ignore
import {useEffect, useState} from 'react'
import {Chessboard} from "react-chessboard";
import * as styled from './Game.styled';
import {Player} from "./Game.styled";
import {io} from "socket.io-client";
import {useParams} from "react-router-dom";
import axios from "axios";

const socket = io('http://localhost:3000');

const Game = () => {
    const [count, setCount] = useState(0)
    const [players, setPlayers] = useState<any>([])

    const { id: gameIdFromURL } = useParams<{ id: string }>();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token !== null) {
            const parsedToken = JSON.parse(token);

            const fetchPlayer = async () => {
                const game = await axios.get(`http://localhost:3000/games/uuid/${gameIdFromURL}`, {
                    headers: {
                        Authorization: `Bearer ${parsedToken.jwtToken}`
                    }
                });

                console.log(game.data);

                setPlayers(game.data.players);
            };

            fetchPlayer();
        }
    }, [])

    useEffect(() => {
        socket.on('playerJoined', ({ game, user }) => {
            if (game.uuid === gameIdFromURL) {
                if (players.length > 0) {
                    setPlayers((prevPlayers: any) => [...prevPlayers, user]);
                } else {
                    setPlayers([user]);
                }

            }
        });
    }, [socket, gameIdFromURL]);

    return (
        <styled.Container>
            <styled.GameContainer>
                <styled.Players>
                    <>
                        {players?.map((player: any) => (
                            <Player key={player.id}>{player.email.split('@')[0]}</Player>
                        ))}
                    </>
                </styled.Players>
                <Chessboard
                    boardWidth={700}
                    customDarkSquareStyle={{
                        backgroundColor: '#244569'
                    }}
                    customLightSquareStyle={{
                        backgroundColor: '#6382ab'
                    }}
                    customBoardStyle={{
                        border: '8px solid #1d3a59'
                    }}
                />
            </styled.GameContainer>
        </styled.Container>
    )
}

export default Game

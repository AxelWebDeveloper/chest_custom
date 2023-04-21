// @ts-ignore
import {JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState} from 'react'
import {Chessboard} from "react-chessboard";
import * as styled from './Game.styled';
import {Player} from "./Game.styled";
import {io} from "socket.io-client";
import {Chess, Piece, Square} from 'chess.js'
import {useParams} from "react-router-dom";
import axios from "axios";
import {MessageInterface} from "../../interfaces/message.interface";
import {UserInterface} from "../../interfaces/user.interface";

const socket = io('http://localhost:3000');

const Game = () => {
    const [chess] = useState<any>(new Chess())
    const [currentPlayer, setCurrentPlayer] = useState<'w' | 'b'>('w')
    const [capturedByWhite, setCapturedByWhite] = useState<Piece[]>([])
    const [messageValue, setMessageValue] = useState<string>('')
    const [messages, setMessages] = useState<any>([])
    const [capturedByBlack, setCapturedByBlack] = useState<Piece[]>([])
    const [position, setPosition] = useState(chess.fen());
    const [players, setPlayers] = useState<UserInterface[]>([])

    const {id: gameIdFromURL} = useParams<{ id: string }>();

    const handleMove = (from: Square, to: Square) => {
        // Effectuer le mouvement
        const move = chess.move({from, to})

        if (!move) return false;

        // Vérifier si un pion a été capturé
        const capturedPiece = move.captured;
        if (capturedPiece) {
            if (capturedPiece.color === 'w') {
                setCapturedByBlack([...capturedByBlack, capturedPiece]);
            } else {
                setCapturedByWhite([...capturedByWhite, capturedPiece]);
            }
        }

        // Changer le joueur courant
        setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w')

        setPosition(chess.fen());

        // Vérifier si la partie est terminée
        if (chess.isCheckmate()) {
            console.log(`Le joueur ${currentPlayer} a perdu !`)
        }

        // Envoyer l'événement de mouvement au serveur
        socket.emit('move', {from, to});

        return true;
    }

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

                setPlayers(game.data.players);
            };

            fetchPlayer();
        }
    }, [])

    useEffect(() => {
        socket.on('moveDone', (data) => {
            chess.move({from: data.from, to: data.to})
            setPosition(chess.fen())
        })
    }, [socket])

    useEffect(() => {
        socket.on('playerJoined', ({game, user}) => {
            if (game.uuid == gameIdFromURL) {
                players.push(user);
            }
        });
    }, [socket, gameIdFromURL]);

    function onDrop(sourceSquare: Square, targetSquare: Square): boolean {
        return handleMove(sourceSquare, targetSquare);
    }

    const onClick = async () => {
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
        const user = await getUser();
        socket.emit('message', {messageValue, user});
    }

    const messageListener = (message: string) => {
        setMessages([...messages, message]);
    }

    useEffect(() => {
        socket.on("message", messageListener);

        return () => {
            socket.off("message", messageListener)
        }
    }, [messageListener]);

    return (
        <styled.Container>
            <styled.GameChat>
                <styled.GameContainer>
                    <styled.Players>
                        <>
                            {players?.map((player: UserInterface) => (
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
                        position={position}
                        onPieceDrop={onDrop}
                    />
                    <div>
                        <h2>Pions capturés par les blancs :</h2>
                        {capturedByWhite.map((piece, index) => (
                            <p key={index}>{piece.toString()}</p>
                        ))}
                        <h2>Pions capturés par les noirs :</h2>
                        {capturedByBlack.map((piece, index) => (
                                <p key={index}>{piece.toString()}</p>
                            )
                        )}
                    </div>
                </styled.GameContainer>
                <styled.ChatContainer>
                    <styled.BlockChat>
                        <styled.Chat>
                            <styled.ChatMessagesContainer>
                                {messages.map((item: { user: { email: string; }; messageValue: string }, index: Key | null | undefined) => (
                                    <styled.MessageContainer1 key={index}>
                                        <>
                                            <styled.Username1>{item.user.email.split('@')[0]}</styled.Username1>
                                            <styled.Message1>{item.messageValue}</styled.Message1>
                                        </>
                                    </styled.MessageContainer1>
                                ))}
                            </styled.ChatMessagesContainer>
                            <styled.Input
                                type="text"
                                placeholder="Entrez votre message..."
                                value={messageValue}
                                onChange={(e) => setMessageValue(e.target.value)}
                            />
                            <button onClick={onClick}>
                                Envoyer
                            </button>
                        </styled.Chat>
                    </styled.BlockChat>
                </styled.ChatContainer>
            </styled.GameChat>
        </styled.Container>
    )
}

export default Game

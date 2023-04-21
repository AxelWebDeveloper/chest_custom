// @ts-ignore
import {useEffect, useState} from 'react'
import {Chessboard} from "react-chessboard";
import * as styled from './Game.styled';
import {Player} from "./Game.styled";
import {io} from "socket.io-client";
import {Chess, Piece, Square} from 'chess.js'
import {useParams} from "react-router-dom";
import axios from "axios";

const socket = io('http://localhost:3000');

const Game = () => {
    const [chess] = useState<any>(new Chess())
    const [currentPlayer, setCurrentPlayer] = useState<'w' | 'b'>('w')
    const [capturedByWhite, setCapturedByWhite] = useState<Piece[]>([])
    const [capturedByBlack, setCapturedByBlack] = useState<Piece[]>([])
    const [position, setPosition] = useState(chess.fen());
    const [players, setPlayers] = useState<any>([])

    const { id: gameIdFromURL } = useParams<{ id: string }>();

    const handleMove = (from: Square, to: Square) => {
        // Effectuer le mouvement
        const move = chess.move({ from, to })

        if(!move) return false;

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
        socket.emit('move', { from, to });

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
            chess.move({ from: data.from, to: data.to })
            setPosition(chess.fen())
        })
    }, [socket])

    useEffect(() => {
        socket.on('playerJoined', ({ game, user }) => {
            if (game.uuid == gameIdFromURL) {
                players.push(user);
            }
        });
    }, [socket, gameIdFromURL]);

    function onDrop(sourceSquare: Square, targetSquare: Square): boolean {
        return handleMove(sourceSquare, targetSquare);
    }

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
            <styled.GameChat>
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
                    <styled.ChatContainer>
                        <styled.BlockChat>
                            <styled.Chat>
                                <styled.ChatMessagesContainer>
                                    <styled.MessageContainer1>
                                        <styled.Username1>Utilisateur 1:</styled.Username1>
                                        <styled.Message1>Bonjour, comment ça va ?</styled.Message1>
                                    </styled.MessageContainer1>
                                    <styled.MessageContainer2>
                                        <styled.Username2>Utilisateur 2:</styled.Username2>
                                        <styled.Message2>Ça va bien, et toi ?</styled.Message2>
                                    </styled.MessageContainer2>
                                </styled.ChatMessagesContainer>
                                <styled.Input
                                    type="text"
                                    placeholder="Entrez votre message..."
                                    //value={value}
                                    //onChange={onChange}
                                    //onKeyPress={handleKeyPress}
                                    />
                             </styled.Chat>
                        </styled.BlockChat>
                </styled.ChatContainer>
            </styled.GameChat>
        </styled.Container>
    )
}

export default Game

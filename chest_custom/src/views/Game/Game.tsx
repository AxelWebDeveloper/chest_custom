// @ts-ignore
import { useState } from 'react'
import {Chessboard} from "react-chessboard";
import * as styled from './Game.styled';
import {Player} from "./Game.styled";

const Game = () => {
    const [count, setCount] = useState(0)

    return (
        <styled.Container>
            <styled.GameContainer>
                <styled.Players>
                    <Player>Axel</Player>
                    <Player>Alexis</Player>
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

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// @ts-ignore
import Chest from "./components/Chest.js"
import {Chessboard} from "react-chessboard";

function App() {
    const [count, setCount] = useState(0)

    return (
        <Chessboard />
    )
}

export default App

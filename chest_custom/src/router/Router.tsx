import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../views/Home/Home";
import Game from "../views/Game/Game";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/game/:id" element={<Game />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;

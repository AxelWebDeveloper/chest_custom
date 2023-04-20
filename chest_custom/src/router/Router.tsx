import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../views/Home/Home";
import Game from "../views/Game/Game";
import Login from "../views/Login/Login";
import RegisterCard from '../views/Register/Register';
import ConfirmAccount from '../views/Register/ConfirmAccount';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/register" element={<RegisterCard />}/>
                <Route path="/confirmAccount" element={<ConfirmAccount />}/>
                <Route path="/game/:id" element={<Game />}/>
                <Route path="/Login:" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;

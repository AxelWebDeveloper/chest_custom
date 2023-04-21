import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../views/Home/Home";
import Game from "../views/Game/Game";
import Login from "../views/Login/Login";
import RegisterCard from '../views/Register/Register';
import ConfirmAccount from '../views/Register/ConfirmAccount';
import ResetPassword from '../views/ResetPassword/ResetPassword';
import ConfirmResetPassword from '../views/ResetPassword/ConfirmResetPassword';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/register" element={<RegisterCard />}/>
                <Route path="/confirmaccount" element={<ConfirmAccount />}/>
                <Route path="/resetpassword" element={<ResetPassword />}/>
                <Route path="/confirmresetpassword" element={<ConfirmResetPassword />}/>
                <Route path="/confirmaccount" element={<ConfirmAccount />}/>
                <Route path="/game/:id" element={<Game />}/>
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;

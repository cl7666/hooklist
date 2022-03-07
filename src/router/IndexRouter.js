import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'


export default function IndexRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={localStorage.getItem("token") ?  <NewsSandBox/> : <Navigate to="/login"/>} />
            </Routes>
        </BrowserRouter >
    )
}
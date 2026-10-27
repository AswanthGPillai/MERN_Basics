import React from 'react'
import Login from '../Guest/Login/Login'
import HomePage from '../Guest/HomePage/HomePage'
import UserReg from '../Guest/UserReg/UserReg'
import { Route, Routes } from 'react-router'

const GuestRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/userreg" element={<UserReg />} />
            </Routes>
        </div>
    )
}

export default GuestRoutes
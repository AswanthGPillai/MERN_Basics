import React from 'react'
import AdminRoutes from './AdminRoutes'
import GuestRoutes from './GuestRoutes'
import UserRoutes from './UserRoutes'
import { Route, Routes } from 'react-router'

const MainRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<GuestRoutes />} />
                <Route path="user/*" element={<UserRoutes />} />
            </Routes>
        </div>
    )
}

export default MainRoutes
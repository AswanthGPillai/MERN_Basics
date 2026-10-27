import React from 'react'
import District from '../Admin/District/District'
import Place from '../Admin/Place/Place'
import { Route, Routes } from 'react-router'
import UserList from '../Admin/UserList/UserList'

const AdminRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/district" element={<District />} />
                <Route path="/place" element={<Place />} />
                <Route path="/userlist" element={<UserList />} />
            </Routes>
        </div>
    )
}

export default AdminRoutes
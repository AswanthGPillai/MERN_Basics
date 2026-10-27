import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router'

const MyProfile = () => {
    const uid = sessionStorage.getItem('uid')

    const [userData, setUserData] = useState({})


    const fetchUserData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/user/${uid}`)
            console.log(res.data.userData);
            setUserData(res.data.userData)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])


    return (
        <div>
            <table border={1} align='center' cellPadding={10}>
                <tr>
                    <td colSpan={2} align='center'><img src={`http://localhost:5000/${userData.photo}`} alt="" width={150} height={150} /></td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{userData.name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{userData.email}</td>
                </tr>
                <tr>
                    <td>contact</td>
                    <td>{userData.contact}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{userData.address}</td>
                </tr>
                <tr>
                    <td>Place</td>
                    <td>{userData.placeId?.place}</td>
                </tr>
                <tr>
                    <td>District</td>
                    <td>{userData.placeId?.districtId?.districtName}</td>
                </tr>
                <tr>
                    <td colSpan={2} align='center'>
                        <Link to={'/user/editprofile'}>Edit Profile</Link><br />
                        <Link to={'/user/changepassword'}>Change Password</Link>
                    </td>
                </tr>

            </table>
        </div>
    )
}

export default MyProfile
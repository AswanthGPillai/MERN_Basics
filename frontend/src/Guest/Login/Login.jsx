import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/login', { email, password })
            console.log(res.data.userData);
            if (res.data.userData.role == "user") {
                sessionStorage.setItem("uid", res.data.userData.id)
                alert('Login Successfull...')
                navigate('/user')
            }

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <table border={1} align='center' cellPadding={10}>
                <tr>
                    <td>Email</td>
                    <td><input type="text" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="password" onChange={(e) => setPassword(e.target.value)} /></td>
                </tr>
                <tr>
                    <td colSpan={2} align='center'>
                        <button onClick={handleLogin}>Submit</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Login
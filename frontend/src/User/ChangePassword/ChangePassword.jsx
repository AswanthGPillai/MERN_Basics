import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const ChangePassword = () => {
  const uid = sessionStorage.getItem('uid')

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()


  const handleSubmit = async () => {
    try {
      if (newPassword !== confirmPassword) {
        alert('New Password and Confirm Password do not match')
        return
      }
      const res = await axios.put(`http://localhost:5000/user/changepassword/${uid}`, { oldPassword, newPassword })
      alert(res.data?.msg)
      navigate('/user/myprofile')
    } catch (error) {
      console.log(error);

    }
  }


  return (
    <div>
      <table border={1} align='center' cellPadding={10}>
        <tr>
          <td>Old Password</td>
          <td><input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /></td>
        </tr>
        <tr>
          <td>New Password</td>
          <td><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></td>
        </tr>
        <tr>
          <td>Confirm Password</td>
          <td><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></td>
        </tr>
        <tr>
          <td colSpan={2} align='center'>
            <button onClick={handleSubmit}>Submit</button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default ChangePassword
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router'

const HomePage = () => {
  const uid = sessionStorage.getItem('uid')

  const [name, setName] = useState("")


  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${uid}`)
      console.log(res.data.userData);
      setName(res.data.userData.name)

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(()=>{
    fetchUserData()
  },[])
  return (
    <div>
      Welcome, {name}
      <br /><br />

      <Link to={"/user/myprofile"}>My Profile</Link>
    </div>
  )
}

export default HomePage
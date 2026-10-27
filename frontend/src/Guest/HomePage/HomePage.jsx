import React from 'react'
import { Link } from 'react-router'

const HomePage = () => {
  return (
    <div>
        <h1>Welcome,</h1><br />
        <Link to={"/login"}>Login</Link><br />
        <Link to={"/userreg"}>User Registration</Link>
    </div>
  )
}

export default HomePage
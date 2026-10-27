import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const UserList = () => {
  const [usersData, setUsersData] = useState([])

  const fetchUsersData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users')
      console.log(res.data.usersData);

      setUsersData(res.data.usersData)
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchUsersData()
  }, [])
  return (
    <div>
      <table border={1} align='center' cellPadding={10}>
        <tr>
          <td>Sl.No</td>
          <td>Name</td>
          <td>Email</td>
          <td>Contact</td>
          <td>Address</td>
          <td>Place</td>
          <td>District</td>
          <td>Photo</td>
          <td>Action</td>

        </tr>

        {usersData.map((data, index) => (
          <tr key={data._id}>
            <td>{index + 1}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.contact}</td>
            <td>{data.address}</td>
            <td>{data.placeId.place}</td>
            <td>{data.placeId.districtId.districtName}</td>
            <td><img src={`http://localhost:5000/${data.photo}`} alt="" width={150} height={150}/></td>
            <td>
              <button>Accept</button>
              <button>Reject</button>
            </td>
          </tr>))}
      </table>
    </div>
  )
}

export default UserList
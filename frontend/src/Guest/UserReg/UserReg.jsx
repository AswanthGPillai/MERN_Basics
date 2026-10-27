import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserReg = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [photo, setPhoto] = useState("")
    const [password, setPassword] = useState("")
    const [districtId, setDistrictId] = useState(null)
    const [placeId, setPlaceId] = useState(null)
    const [districtData, setDistrictData] = useState([])
    const [placeData, setPlaceData] = useState([])





    const fetchDistrictData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/districts')
            console.log(res.data);

            setDistrictData(res.data)
        }
        catch (err) {
            console.log(err);

        }
    }


    const fetchPlaceData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/place')
            console.log(res.data);
            setPlaceData(res.data.placeData)
        } catch (error) {
            console.log(error);

        }
    }



    const handleSubmit = async () => {
        try {
            const formdata = new FormData()
            formdata.append("name", name)
            formdata.append("email", email)
            formdata.append("contact", contact)
            formdata.append("address", address)
            formdata.append("placeId", placeId)
            formdata.append("photo", photo)
            formdata.append("password", password)
            const res = await axios.post('http://localhost:5000/user', formdata)
            alert(res.data.msg)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchDistrictData()
        fetchPlaceData()
    }, [])
    return (
        <div>
            <table border={1} align='center' cellPadding={10}>
                <tr>
                    <td>Name</td>
                    <td><input type="text" onChange={(e) => setName(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input type="email" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Contact</td>
                    <td><input type="text" onChange={(e) => setContact(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td><input type="text" onChange={(e) => setAddress(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>District</td>
                    <td>
                        <select name="" id="" onChange={(e) => setDistrictId(e.target.value)}>
                            <option value="">--Select--</option>
                            {districtData.map((data) => (
                                <option key={data._id} value={data._id}>{data.districtName}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Place</td>
                    <td>
                        <select name="" id="" onChange={(e) => setPlaceId(e.target.value)}>
                            <option value="">--Select--</option>
                            {placeData.filter(data => data.districtId._id == districtId).map((data) => (
                                <option key={data._id} value={data._id}>{data.place}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Photo</td>
                    <td><input type="file" onChange={(e) => setPhoto(e.target.files[0])} /></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="password" onChange={(e) => setPassword(e.target.value)} /></td>
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

export default UserReg
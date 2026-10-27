import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const EditProfile = () => {
    const uid = sessionStorage.getItem('uid')

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [districtId, setDistrictId] = useState(null)
    const [placeId, setPlaceId] = useState(null)
    const [photo, setPhoto] = useState("")
    const [districtData, setDistrictData] = useState([])
    const [placeData, setPlaceData] = useState([])

    const navigate = useNavigate()



    const fetchUserData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/user/${uid}`)
            console.log(res.data.userData);
            setName(res.data.userData.name)
            setEmail(res.data.userData.email)
            setContact(res.data.userData.contact)
            setAddress(res.data.userData.address)
            setDistrictId(res.data.userData.placeId.districtId._id)
            setPlaceId(res.data.userData.placeId._id)
            setPhoto(res.data.userData.photo)

        } catch (error) {
            console.log(error);

        }
    }



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


    const handleUpdate = async () => {
        try {
            const formdata = new FormData()
            formdata.append("name", name)
            formdata.append("email", email)
            formdata.append("contact", contact)
            formdata.append("address", address)
            formdata.append("placeId", placeId)
            formdata.append("photo", photo)
            const res = await axios.put(`http://localhost:5000/user/${uid}`, formdata)
            console.log(res.data);
            alert(res.data.msg)
            navigate('/user/myprofile')


        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchUserData()
        fetchDistrictData()
        fetchPlaceData()
    }, [])

    return (
        <div>
            <table border={1} align='center' cellPadding={10}>
                <tr>
                    <td>
                        <img src={`http://localhost:5000/${photo}`} alt="" width={150} height={150} />
                    </td>
                    <td>
                        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                    </td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Contact</td>
                    <td><input type="text" value={contact} onChange={(e) => setContact(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>
                        <textarea name="" id="" value={address} onChange={(e) => setAddress(e.target.value)} cols="30" rows="10">
                        </textarea>
                    </td>
                </tr>
                <tr>
                    <td>District</td>
                    <td>
                        <select name="" id="" value={districtId} onChange={(e) => setDistrictId(e.target.value)}>
                            <option value="">--select--</option>
                            {districtData.map((district) => (
                                <option key={district._id} value={district._id}>
                                    {district.districtName}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Place</td>
                    <td>
                        <select name="" id="" value={placeId} onChange={(e) => setPlaceId(e.target.value)}>
                            <option value="">--select--</option>
                            {placeData.filter(place => place.districtId._id === districtId).map((place) => (
                                <option key={place._id} value={place._id}>
                                    {place.place}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} align='center'>
                        <button onClick={handleUpdate}>Update</button>
                    </td>
                </tr>

            </table>
        </div>
    )
}

export default EditProfile
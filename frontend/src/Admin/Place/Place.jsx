import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { data } from 'react-router'

const Place = () => {
    const [place, setPlace] = useState("")
    const [districtId, setDistrictId] = useState(null)
    const [districtData, setDistrictData] = useState([])
    const [placeData, setPlaceData] = useState([])
    const [editId, setEditId] = useState(null)



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

    const handleSubmit = async () => {
        try {
            if (editId) {
                const res = await axios.put(`http://localhost:5000/place/${editId}`, { place, districtId })
                alert(res.data.msg)
                setEditId(null)
                setDistrictId(null)
                setPlace("")
                fetchPlaceData()
            } else {
                const res = await axios.post('http://localhost:5000/place', { place, districtId })
                alert(res.data.msg)
                setDistrictId(null)
                setPlace("")
                fetchPlaceData()
            }
        } catch (error) {
            console.log(error);

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


    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/place/${id}`)
            alert(res.data.message)
            fetchPlaceData()
        }
        catch (err) {
            console.log(err);

        }
    }



    const handleEdit = (data) => {

        setEditId(data._id)
        setDistrictId(data.districtId._id)
        setPlace(data.place)

    }




    useEffect(() => {
        fetchDistrictData()
        fetchPlaceData()
    }, [])
    return (
        <div>
            <table border={1} align='center' cellPadding={10}>
                <tr>
                    <td>District</td>
                    <td>
                        <select name="" id="" value={districtId} onChange={(e) => setDistrictId(e.target.value)}>
                            <option value="" selected={districtId == null}>--select--</option>
                            {districtData.map((data, index) => (
                                <option key={data._id} value={data._id}>{data.districtName}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Place</td>
                    <td><input type="text" value={place} onChange={(e) => setPlace(e.target.value)} /></td>
                </tr>
                <tr>
                    <td colSpan={2} align='center'>
                        <button onClick={handleSubmit}>Submit</button>
                    </td>
                </tr>
            </table>
            <br /><br />


            <table border={1} align='center' cellPadding={10}>
                <tr>
                    <td>SlNo</td>
                    <td>Place</td>
                    <td>District</td>
                    <td>Action</td>
                </tr>
                {placeData.map((data, index) => (
                    <tr key={data._id}>
                        <td>{index + 1}</td>
                        <td>{data.place}</td>
                        <td>{data.districtId.districtName}</td>
                        <td>
                            <button onClick={() => handleEdit(data)}>Edit</button>
                            <button onClick={() => handleDelete(data._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Place
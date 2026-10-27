import axios from 'axios'
import React, { useEffect, useState } from 'react'


const District = () => {
    const [district, setDistrict] = useState('')
    const [districts, setDistricts] = useState([])
    const [editId, setEditId] = useState(null)

    const handleSubmit = async () => {
        try {
            if (editId) {
                const res = await axios.put(`http://localhost:5000/district/${editId}`, { district })
                alert('District Updated')
                setDistrict('')
                fetchDistrictData()
                setEditId(null)

            }

            else {
                const res = await axios.post('http://localhost:5000/district', { district })
                alert('District Inserted')
                setDistrict('')
                fetchDistrictData()
            }
        }
        catch (err) {
            console.log(err);

        }
    }



    const fetchDistrictData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/districts')
            console.log(res.data);

            setDistricts(res.data)
        }
        catch (err) {
            console.log(err);

        }
    }



    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/district/${id}`)
            alert('Disrtrict Deleted')
            fetchDistrictData()
        }
        catch (err) {
            console.log(err);

        }
    }

    const handleEdit = (data) => {
  
            setEditId(data._id)
            setDistrict(data.districtName)

    }



    useEffect(() => {
        fetchDistrictData()
    }, [])
    return (
        <div>
            <table border="2" align='center'>
                <tr>
                    <td>District Name</td>
                    <td><input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} /></td>
                </tr>
                <tr>
                    <td colSpan="2" align='center'><button onClick={handleSubmit}>Submit</button></td>
                </tr>
            </table>
            <br /><br /><br /><br /><br />
            <table border="2" align='center' >
                <tr>
                    <td>SlNo</td>
                    <td>District</td>
                    <td>Action</td>
                </tr>
                {districts.map((items, index) => (
                    <tr key={items._id}>
                        <td>{index + 1}</td>
                        <td>{items.districtName}</td>
                        <td>
                            <button onClick={() => handleEdit(items)}>Edit</button>
                            <button onClick={() => handleDelete(items._id)}>Delete</button>
                        </td>


                    </tr>
                ))}
            </table>
        </div>
    )
}

export default District
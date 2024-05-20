import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './App.css'

function Home() {
    const [data, setData] = useState([])
    const [deleted, setDeleted] = useState(true)

    useEffect(() => {
        if (deleted) {
            setDeleted(false)
        }
        axios.get('http://localhost:5000/students')
            .then(res => {
                if (res.status != 200) {
                    throw new Error('Network response was not ok');
                }
                return res.data;
            })
            .then(data => setData(data))
            .catch(err => console.log(err))

    }, [])

    function handleDelete(id) {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then((res) => {
                setDeleted(true)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='parent'>
                <div className='child'>
                    <h3>Student Management System</h3><br />
                    <Link className='buttons' to='/create'>Add Student</Link><br /><br />
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='mg'>ID</th>
                                <th className='mg'>Name</th>
                                <th className='mg'>Email</th>
                                <th className='mg'>Age</th>
                                <th className='mg'>Gender</th>
                                <th className='mg'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((student) => {
                                    return (
                                        <tr>
                                            <td className='mg'>{student.id}</td>
                                            <td className='mg'>{student.name}</td>
                                            <td className='mg'>{student.email}</td>
                                            <td className='mg'>{student.age}</td>
                                            <td className='mg'>{student.gender}</td>
                                            <td className='mg'>
                                                <Link className='buttons' to={`/read/${student.id}`}>Read</Link>
                                                <Link className='buttons' to={`/edit/${student.id}`}>Edit</Link>
                                                <button className='buttons' onClick={() => handleDelete(student.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <footer>© Atharva Sayankar</footer>
        </>
    )
}

export default Home

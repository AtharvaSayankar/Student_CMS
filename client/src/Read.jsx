import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import './App.css'

function Read() {

    const [data, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/get_student/${id}`)
            .then(res => {
                if (res.status != 200) {
                    throw new Error('Network response was not ok');
                }
                return res.data;
            })
            .then(data => setData(data))
            .catch(err => console.log(err))

    }, [id])

    return (
        <>
            <div className='parent'>
                <div className='child'>
                    <h3>Student {id}</h3><br />
                    <Link className='buttons' to='/'>Home</Link><br /><br />
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='mg'>ID</th>
                                <th className='mg'>Name</th>
                                <th className='mg'>Email</th>
                                <th className='mg'>Age</th>
                                <th className='mg'>Gender</th>
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
                                        </tr>)
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

export default Read

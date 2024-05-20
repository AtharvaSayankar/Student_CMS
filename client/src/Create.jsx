import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'

function Create() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    })

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        axios.post('http://localhost:5000/add_user', values)
            .then((res) => {
                navigate('/')
                console.log(res)
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h3>Add Student</h3><br />
                    <Link className='buttons mg' to='/'>Home</Link><br /><br />
                    <div>
                        <input placeholder='Name' type="text" name='name' onChange={(e) => setValues({ ...values, name: e.target.value })} />
                    </div>
                    <div>
                        <input placeholder='example@email.com' type="email" name='email' onChange={(e) => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div className='ac'>
                        <input placeholder='Gender' type="text" name='gender' onChange={(e) => setValues({ ...values, gender: e.target.value })} />
                    </div>
                    <div className='ac'>
                        <input placeholder='Age' type="number" name='age' onChange={(e) => setValues({ ...values, age: e.target.value })} />
                    </div>
                    <div>
                        <button className='buttons' type='submit'>Save</button>
                    </div>
                </form>
            </div>
            <footer>© Atharva Sayankar</footer>
        </>
    )
}

export default Create
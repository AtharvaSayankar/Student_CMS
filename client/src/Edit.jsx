import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './App.css'

function Edit() {
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

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    axios.post(`http://localhost:5000/edit_student/${id}`, data[0])
      .then((res) => {
        navigate('/')
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div className='form-container'>
        {
          data.map((student) => {
            return (
              <form onSubmit={handleSubmit}>
                <h3>Edit student {id}</h3><br />
                <Link className='buttons mg' to='/'>Home</Link><br /><br />
                <div>
                  <input placeholder='Name' type="text" name='name' value={student.name} required onChange={(e) => setData([{ ...data[0], name: e.target.value }])} />
                </div>
                <div>
                  <input placeholder='example@email.com' type="email" name='email' value={student.email} required onChange={(e) => setData([{ ...data[0], email: e.target.value }])} />
                </div>
                <div>
                  <input placeholder='Gender' type="text" name='gender' value={student.gender} required onChange={(e) => setData([{ ...data[0], gender: e.target.value }])} />
                </div>
                <div>
                  <input placeholder='Age' type="number" name='age' value={student.age} required onChange={(e) => setData([{ ...data[0], age: e.target.value }])} />
                </div>
                <div>
                  <button className='buttons mg' type='submit'>Save</button>
                </div>
              </form>
            )
          })
        }
      </div>
      <footer>© Atharva Sayankar</footer>
    </>
  )
}

export default Edit

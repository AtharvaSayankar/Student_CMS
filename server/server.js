const express = require('express');
const { getStudents, createStudent, getStudent, editStudent, deleteStudent } = require('./database.js');
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json())

app.get('/students', async (req, res) => {
    const notes = await getStudents()
    res.send(notes)
})

app.post("/add_user", async (req, res) => {
    const {name, email, age, gender} = req.body
    const note = await createStudent(name, email, age, gender)
    res.status(201).send(note)
})

app.get('/get_student/:id', async (req, res) => {
    const id = req.params.id
    const note = await getStudent(id)
    res.send(note)
})

app.post("/edit_student/:id", async (req, res) => {
    const id = req.params.id
    const {name, email, age, gender} = req.body
    const note = await editStudent(name, email, age, gender, id)
    res.status(201).send(note)
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const note = await deleteStudent(id)
    res.status(201).send(note)
})

//middleware for error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(5000, () =>{
    console.log('listening')
})
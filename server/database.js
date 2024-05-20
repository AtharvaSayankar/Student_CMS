const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "atharva",
    database: "students",
}).promise()

async function getStudents() {
    const rows = await pool.query('SELECT * FROM student_details')
    return rows[0]
}

async function getStudent(id){
    const rows = await pool.query(`SELECT * FROM student_details WHERE id = ?`,[id])
    return rows[0]
}

async function createStudent(name, email, age, gender){
    const result = await pool.query(`
    INSERT INTO student_details(name, email, age, gender) VALUES (?, ?, ?, ?) `
    ,[
        name, email, age, gender
    ])
    return result
}

async function editStudent(name, email, age, gender, id){
    const result = await pool.query(`
    UPDATE student_details SET name=?, email=?, age=?, gender=? WHERE id = ? `
    ,[
        name, email, age, gender, id
    ])
    return result
}

async function deleteStudent(id){
    const result = await pool.query(`
    DELETE FROM student_details WHERE id = ? `
    ,[
        id
    ])
    return result
}

module.exports = { getStudents, createStudent, getStudent, editStudent, deleteStudent };
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const {Client} = require('pg')
const app = express()
app.use(express.json())



app.use(cors())


let count = 5




app.get('/todos', async (req, res) => {
    console.log(process.env.HOST)
    const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    port: 5432,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

   await client.connect()
   const result = await client.query('SELECT todo FROM todos')

   const todos = result.rows.map(row => row.todo)



    res.json(todos)
})


app.post('/todos', async (req, res) => {

let todo = req.body
console.log(todo)
count++
console.log(process.env.HOST)


    const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    port: 5432,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

   await client.connect()
   const result = await client.query(`INSERT INTO todos (id, todo) VALUES (${count}, '${todo.todo}')`)
    res.json(result)
})








const PORT = process.env.PORT || 3011

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})

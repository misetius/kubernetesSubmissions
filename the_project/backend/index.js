const axios = require('axios')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const {Client} = require('pg')
const morgan = require('morgan')
const app = express()
app.use(express.json())


app.use(morgan('tiny'))
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

    await client.end()

    res.json(todos)
})


app.post('/todos', async (req, res) => {

const todo = req.body

if  (todo.todo.length > 140) {
    res.status(400).send("maximum length of todo is 140")
}

else {

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
   await client.end() 
   res.json(result)

    }
})








const PORT = process.env.PORT || 3011

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})

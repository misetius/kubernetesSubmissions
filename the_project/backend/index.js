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
   const result = await client.query('SELECT * FROM todos')

   const todos = result.rows.map(row => ({
    todo: row.todo,
    id: row.id,
    done: row.done
}));

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
   const result = await client.query(`INSERT INTO todos (todo, done) VALUES ('${todo.todo}', FALSE)`)
   await client.end()
   console.log(result) 
   res.json(result)

    }
})

app.put("/todos/:id", async (req, res) => {

    const id = req.params.id
    const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    port: 5432,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

   await client.connect()
   const result = await client.query(`UPDATE todos SET done = TRUE  WHERE id = ${id}`)
   await client.end() 
   res.json(result)



})

async function database() {
    const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    port: 5432,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
    await client.connect();

    try {
    const res = await client.query(`SELECT * FROM todos`);
    }
    catch{
    console.log(`table not found`);
    await client.query(`CREATE TABLE todos(id SERIAL PRIMARY KEY, todo varchar, done boolean);`);
    await client.end()
    }
    
}









const PORT = process.env.PORT || 3011
database()
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})

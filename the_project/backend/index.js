const axios = require('axios')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
app.use(express.json())



app.use(cors())



let todos = ["tes1","test2", "test3"]







app.get('/todos', (req, res) => {
    res.json(todos)
})


app.post('/todos', (req, res) => {

let todo = req.body
console.log(todo)

   todos = todos.concat(todo.todo)
    res.json(todos)
})








const PORT = process.env.PORT || 3011

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})

const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const {Client} = require('pg')
const app = express()
app.use(express.json())

app.use(cors())

let pongs =-1

app.get('/', (req, res) => {
    res.json({"pings" : pongs})
})


app.get('/pingpong',  async (req, res) => {
   // const directory = path.join('/', 'usr', 'src', 'app', 'pongs', "pongs.txt")
    //const filePath = path.join(directory)
    const client = new Client({
    host: "postgres",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "postgres"
})

    pongs++
    console.log(pongs)
   
    const pings = pongs
    const pongdata = `Ping / Pongs: ${pings}`
    //fs.writeFileSync(filePath, pongdata, "utf8")
    //const data = fs.readFileSync(filePath)
    await client.connect()                                      
    await client.query(`INSERT INTO responses (amount) VALUES (${pongs})`)

    
    res.send(`<p>pong ${pongs} ${pongdata}</p>`)
})

async function database() {
    const client = new Client({
    host: "postgres",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "postgres"
})
    await client.connect();

    try {
    const res = await client.query(`SELECT * FROM responses`);
    }
    catch{
    console.log(`table not found`);
    await client.query(`CREATE TABLE responses(id SERIAL PRIMARY KEY, amount int);`);
    }
    
}


const PORT = process.env.PORT || 3006
database()
app.listen(PORT, () => {
    console.log(`Server test started in port ${PORT}`)
})

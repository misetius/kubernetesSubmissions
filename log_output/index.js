const express = require('express')
const app = express()
app.use(express.json())


let randomString = require("randomstring")

const string = randomString.generate()


setInterval(() => {
    let date_time = new Date()
  console.log(date_time, string);
}, 5000);


app.get('/', (req, res) => {
    let date_time = new Date()
    const data = {"date": date_time, "randomString": string}
    res.json(data)
})


const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})

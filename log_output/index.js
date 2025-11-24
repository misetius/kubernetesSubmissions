let randomString = require("randomstring")

const string = randomString.generate()


setInterval(() => {
    let date_time = new Date()
  console.log(date_time, string);
}, 5000);
const NATS = require('nats')
const nc = NATS.connect({
  url: process.env.NATS_URL || 'nats://nats:4222'
});

// const sc = NATS.StringCodec();

const subscription = nc.subscribe('todo_data', {
    queue: 'broadcasters',
});


for await (const message of subscription){
    try{
        const todo_data = JSON.parse(message)
        console.log(todo_data)
    }
    catch (error) {
        console.error(error)
    }
}
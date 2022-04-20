const amqp = require('amqplib');


connect();
async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        channel.consume("jobs", (msg) => {
            const result = JSON.parse(msg.content.toString());
            console.log("message received: ", result);
        })
    } catch (error) {
        console.log(error);
    }
}
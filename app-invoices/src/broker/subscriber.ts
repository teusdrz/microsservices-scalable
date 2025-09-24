import { orders } from "../broker/channels/orders.ts"

orders.consume('orders', async message => {
            console.log(message?.content.toString())

            orders.ack(message!)
}, {
            noAck: false
})






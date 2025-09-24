import { fastify } from 'fastify'
import { randomUUID } from 'node:crypto'
import { fastifyCors } from '@fastify/cors'
import { custom, z } from 'zod'
import {
            serializerCompiler,
            validatorCompiler,
            type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { db } from '../db/client.ts'
import { schema } from '../db/schema/index.ts'
import { dispatchOrderCreated } from '../broker/messages/order-created.ts'





const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
            origin: '*'
})


// health => verify if the application is running
app.get('/health', () => {
            return 'OK'
})

app.post('/orders', {
            schema: {
                        body: z.object({
                                    amount: z.coerce.number(),
                                    customerId: z.string(),
                        })
            }
}, async (request, reply) => {
            const { amount, customerId } = request.body

            console.log('Creating an order with amount', amount)

            const orderId = randomUUID()

            dispatchOrderCreated({
                        orderId,
                        amount,
                        customerId: {
                                    id: customerId
                        }
            })



            await db.insert(schema.orders).values({
                        id: orderId,
                        customerId,
                        amount,

            })


            return reply.status(201).send()
})

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
            console.log('[Orders] HTTP server running!')
})
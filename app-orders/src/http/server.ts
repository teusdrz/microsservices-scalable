import '@opentelemetry/auto-instrumentations-node/register'
import { fastify } from 'fastify'
import { randomUUID } from 'node:crypto'
import { trace } from '@opentelemetry/api'
import { setTimeout } from 'node:timers/promises'
import { fastifyCors } from '@fastify/cors'
import { custom, set, z } from 'zod'
import {
            serializerCompiler,
            validatorCompiler,
            type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { db } from '../db/client.ts'
import { schema } from '../db/schema/index.ts'
import { dispatchOrderCreated } from '../broker/messages/order-created.ts'
import { tracer } from '../tracer/tracer.ts'





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


            trace.getActiveSpan()?.setAttribute('order.id', orderId)



            await db.insert(schema.orders).values({
                        id: orderId,
                        customerId,
                        amount,

            })



            const span = tracer.startSpan('Simulating a long task')

            span.setAttribute('just', 'testing')

            await setTimeout(2000)

            span.end()






            return reply.status(201).send()
})

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
            console.log('[Orders] HTTP server running!')
})
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))

app.get("/todos", (c) => {
    return new Response("TODOS Collection")
})

export default app

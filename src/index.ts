import { Hono } from "hono";
import { cors } from "hono/cors";
import { v4 as uuidv4 } from "uuid";
import { swaggerUI } from "@hono/swagger-ui";
import { StatusCode } from "hono/utils/http-status";
import {
  StructError,
  assert,
  boolean,
  object,
  optional,
  string,
} from "superstruct";

const todoSchema = object({
  title: string(),
  completed: optional(boolean()),
});

class CustomError extends Error {
  constructor(public status: StatusCode, public message: string) {
    super(message);
    this.name = "Custom Hono Error";
  }
}

type Context = {
  Bindings: {
    TODOS: KVNamespace;
  };
};

const app = new Hono<Context>();

app.use("*", cors({ origin: "*", maxAge: 3600 * 6, credentials: true }));

app.onError((error, c) => {
  console.log(error.message);

  const status =
    error instanceof CustomError
      ? error.status
      : error instanceof StructError
      ? 400
      : 500;

  return c.json({ error: error.message, status: status }, status);
});

app.get("/", (c) => {
  console.log("somebody is accessing this endpoint.");
  return c.text("Hello Marc!");
});

app.get("/todos", async (c) => {
  const items = await c.env.TODOS.list();
  const todos = await Promise.all(
    items.keys.map(({ name }) => c.env.TODOS.get(name))
  );
  return c.json(todos);
});

app.get("/todos/:user_id", async (c) => {
  const user_id = c.req.param("user_id");

  const items = await c.env.TODOS.list({ prefix: `${user_id}_` });
  const todos = await Promise.all(
    items.keys.map(({ name }) => c.env.TODOS.get(name))
  );
  return c.json(todos);
});

app.post("/todos/:user_id", async (c) => {
  const user_id = c.req.param("user_id");
  const data = await c.req.json();

  assert(data, todoSchema);

  const id = uuidv4();

  const todo = {
    id,
    title: data.title,
    completed: data.completed,
  };

  await c.env.TODOS.put(`${user_id}_${id}`, JSON.stringify(todo));
  return c.json(todo);
});

// Use the middleware to serve Swagger UI at /ui
app.get("/ui", swaggerUI({ url: "/doc" }));

app.get("/error", (c) => {
  const data = {
    title: "test",
    completed: "false",
  };
  assert(data, todoSchema);
  return c.json(data);
});

export default app;

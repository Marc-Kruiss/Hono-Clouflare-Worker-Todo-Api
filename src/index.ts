import { Hono } from "hono";
import { cors } from "hono/cors";
import { v4 as uuidv4 } from "uuid";
import { swaggerUI } from "@hono/swagger-ui";

import {
  StructError,
  assert,
  boolean,
  object,
  optional,
  string,
} from "superstruct";
import {
  authenticateUser,
  helloMiddleware,
  superSecretWeapon,
} from "./middleware";
import { CustomError } from "./errors";
import { swaggerSpec } from "./swagger-spec";

const todoSchema = object({
  title: string(),
  completed: optional(boolean()),
});

type Context = {
  Bindings: {
    TODOS: KVNamespace;
  };
  Variables: {
    secret: string;
    user_id: string;
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

// Use the middleware to serve Swagger UI at /ui
app.get("/swagger-spec", (c) =>
  c.text(swaggerSpec, { headers: { "Content-Type": "application/yaml" } })
);
app.get("/ui", swaggerUI({ spec: swaggerSpec, url: "/swagger-spec" }));

app.get("/", helloMiddleware, superSecretWeapon, authenticateUser, (c) => {
  const secret = c.get("secret");

  const userId = c.get("user_id");
  return c.text(secret);
});

app.get("/todos", authenticateUser, async (c) => {
  const user_id = c.get("user_id");
  const items = await c.env.TODOS.list({ prefix: `${user_id}_` });
  const todos = await Promise.all(
    items.keys.map(({ name }) => c.env.TODOS.get(name))
  );
  return c.json(todos);
});

app.post("/todos", authenticateUser, async (c) => {
  const user_id = c.get("user_id");
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

app.get("/error", (c) => {
  const data = {
    title: "test",
    completed: "false",
  };
  assert(data, todoSchema);
  return c.json(data);
});

export default app;

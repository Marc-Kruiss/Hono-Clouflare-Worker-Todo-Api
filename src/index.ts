import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";
import { swaggerUI } from "@hono/swagger-ui";
import { StatusCode } from "hono/utils/http-status";

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

app.onError((error, c) => {
  console.log(error.message);

  const status = error instanceof CustomError ? error.status : 500;

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
  const data = await c.req.formData();

  /**
   * Title
   * Completed
   * 
   */

  console.log(data);

  const title = data.get("title");
  console.log(title);
  if (!title) {
    throw new CustomError(400, "Missing title");
  }
  const completed = data.get("completed") === "true";
  const id = uuidv4();

  const todo = {
    id,
    title,
    completed,
  };

  await c.env.TODOS.put(`${user_id}_${id}`, JSON.stringify(todo));
  return c.json(todo);
});

// Use the middleware to serve Swagger UI at /ui
app.get("/ui", swaggerUI({ url: "/doc" }));

app.get("/error", (c) => {
  throw new CustomError(403, "Custom Error");
});

export default app;

import type { MiddlewareHandler } from "hono";
import { CustomError } from "./errors";

export const helloMiddleware: MiddlewareHandler = async (c, next) => {
  console.log("hey");
  await next();
};

export const superSecretWeapon: MiddlewareHandler = async (c, next) => {
  c.set("secret", "1234");
  await next();
};

export const authenticateUser: MiddlewareHandler = async (c, next) => {
  // Check for Authentication headers
  const authentication = c.req.header("Authentication");
  const user_id = authentication?.split("Bearer ")[1];

  // Bearer 4d78eg4484gfg81 ("user_id")
  if (!user_id) {
    throw new CustomError(401, "Missing Authentication header");
  }
  // Inject user info
  c.set("user_id", user_id);
  await next();
};

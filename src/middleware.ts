import type { MiddlewareHandler } from "hono";
import { CustomError } from "./errors";
import { decode, sign, verify } from "hono/jwt";
import { env } from "hono/adapter";

export const helloMiddleware: MiddlewareHandler = async (c, next) => {
  console.log("hey");
  await next();
};

export const setContextVariable: MiddlewareHandler = async (c, next) => {
  c.set("customContextVar", "1234");
  await next();
};

// Authentication with simple Bearer Token existence, use token as user_id
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

// jwt workflow
const jwtMiddlewareTemplate: MiddlewareHandler = async (c, next) => {
  const payload = {
    sub: "user123",
    role: "admin",
  };
  let jwt_secret = "mySecretKey";
  const token = await sign(payload, jwt_secret);
  console.log("Token");
  console.log(token);

  const decodedPayload = await verify(token, jwt_secret);
  console.log("Decoded Payload");
  console.log(decodedPayload);

  await next();
};

// verify jwt token
export const authMiddleware: MiddlewareHandler = async (c, next) => {
  // Get Secret and token from header
  const { jwt_secret } = env(c, "workerd");
  const token = c.req.header("Authorization")?.split("Bearer ")[1];

  if (!token) {
    throw new CustomError(401, "Invalid Authorization header");
  }

  // Hier JWT-Token überprüfen
  const user = await verify(token, jwt_secret).catch((err: Error) => {
    throw new CustomError(401, `Invalid Authorization token`);
  });

  // Setzen des Benutzers in den Kontext
  c.set("jwtPayload", user);
  console.log("Auth Payload");
  console.log(user);

  return next();
};

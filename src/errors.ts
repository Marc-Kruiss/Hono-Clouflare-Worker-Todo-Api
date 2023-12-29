import { StatusCode } from "hono/utils/http-status";

export class CustomError extends Error {
  constructor(public status: StatusCode, public message: string) {
    super(message);
    this.name = "Custom Hono Error";
  }
}

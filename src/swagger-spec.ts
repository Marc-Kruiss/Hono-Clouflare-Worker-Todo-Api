export const swaggerSpec: string = `
swagger: "2.0"
info:
  title: "Todo Hono API for Cloudflare Workers API"
  description: "Hono API to handle Todos for Cloudflare Workers, integrating jwt authentication and cloudflare's k1 database"
  version: "1.0.0"
basePath: "/"
schemes:
  - "http"

paths:
  /:
    get:
      summary: "Hello Endpoint"
      responses:
        200:
          description: "Successful response"
          content:
            text/plain:
              schema:
                type: string
              example: "Hello, World!"

  /error:
    get:
      summary: "Error Endpoint"
      responses:
        200:
          description: "Successful response"
          content:
            application/json:
              schema:
                type: object
                properties:
                  title:
                    type: string
                  completed:
                    type: boolean
              example:
                title: "test"
                completed: false

  /ghl:
    get:
      summary: "GHL Endpoint"
      responses:
        200:
          description: "Successful response"

  /todos:
    get:
      summary: "Get Todos by user_id"
      responses:
        200:
          description: "Successful response"
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: string
                    title:
                      type: string
                    completed:
                      type: boolean

  /api/todos:
    get:
      summary: "Get All Todos"
      responses:
        200:
          description: "Successful response"
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: string
                    title:
                      type: string
                    completed:
                      type: boolean

    post:
      summary: "Create a New Todo"
      parameters:
        - name: body
          in: body
          required: true
          schema:
            type: object
            properties:
              title:
                type: string
              completed:
                type: boolean
      responses:
        201:
          description: "Todo created successfully"
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  title:
                    type: string
                  completed:
                    type: boolean

definitions:
  CustomError:
    type: object
    properties:
      status:
        type: integer
        format: int32
      message:
        type: string

`;

export const swaggerSpec: string = `
openapi: 3.0.0
info:
  title: Todo API
  version: 1.0.0
  description: Eine API für Todo-Management mit Authentifizierung.

servers:
  - url: https://example.com
    description: Live server

paths:
  /todos:
    get:
      summary: Liste aller Todos für einen Benutzer
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Eine Liste von Todos
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Todo'
        '401':
          description: Nicht autorisiert

    post:
      summary: Erstellt ein neues Todo
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Todo'
      responses:
        '201':
          description: Todo erfolgreich erstellt
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Todo'
        '400':
          description: Ungültige Daten
        '401':
          description: Nicht autorisiert

  /ui:
    get:
      summary: Swagger UI
      responses:
        '200':
          description: Swagger UI Seite

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    Todo:
      type: object
      required:
        - title
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        title:
          type: string
        completed:
          type: boolean
          default: false
`;

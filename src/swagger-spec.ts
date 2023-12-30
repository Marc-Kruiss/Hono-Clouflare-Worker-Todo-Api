export const swaggerSpec: string = `
openapi: 3.0.0
info:
  title: Ihre Anwendungsname
  version: 1.0.0
  description: Beschreibung Ihrer Anwendung

paths:
  /api/todos:
    get:
      summary: Todos abrufen
      description: Abrufen aller Todos
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Erfolgreiche Anfrage
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Todo'
        '401':
          $ref: '#/components/responses/Unauthorized'
  
    post:
      summary: Neues Todo erstellen
      description: Erstellen eines neuen Todos
      security:
        - bearerAuth: []
      requestBody:
        description: JSON-Anfragekörper mit Todo-Details
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Todo'
      responses:
        '201':
          description: Erfolgreich erstellt
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Todo'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'

components:
  schemas:
    Todo:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        completed:
          type: boolean
      required:
        - title

  responses:
    Unauthorized:
      description: Ungültiger JWT-Token
    BadRequest:
      description: Ungültige Anfrage

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT


`;

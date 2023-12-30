# Hono Framework API

This is a RESTful API built using the Hono framework, which leverages Cloudflare environment variables, JWT authentication, and the Cloudflare KV database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Middleware](#middleware)
- [Endpoints](#endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before using this API, make sure you have the following prerequisites in place:

- Node.js installed on your system.
- Access to a Cloudflare Workers environment.
- Cloudflare KV database set up with a namespace named "TODOS."
- JWT secret key for authentication.

## Installation

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running the following command: `npm start`

This will launch the API, and it will be accessible at the specified route.

## Middleware

The API uses various middleware functions for handling requests and authentication. These include:

- `helloMiddleware`: Logs a greeting message.
- `superSecretWeapon`: Sets a secret value in the request context.
- `authenticateUser`: Authenticates users based on a Bearer token.
- `authMiddleware`: JWT token verification middleware.

You can customize these middleware functions according to your requirements.

## Endpoints

### Swagger UI

- Access the Swagger UI documentation at `/ui`.

### Get Requests

- `/`: Root endpoint with sample middleware and authentication.
- `/error`: Throws a sample error.
- `/ghl`: Logs the request body.
- `/todos`: Retrieves todos for a specific user.
- `/api/todos`: Retrieves all todos.

### Post Request

- `/api/todos`: Adds a new todo item for a specific user.

## Error Handling

The API includes error handling for various scenarios. Custom errors are defined in the `error.ts` file. The API returns appropriate HTTP status codes and error messages.

## Contributing

Contributions to this project are welcome. Please follow the standard GitHub Fork and Pull Request workflow.

## License

This project is licensed under the [MIT License](LICENSE).

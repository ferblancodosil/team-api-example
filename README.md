# Team API Example

This project is a simple Express API that includes a ping route, integrated with Docker, Swagger for API documentation, and Prisma for database management.

## Features

- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Docker**: Containerization for easy deployment and management.
- **Swagger**: API documentation for easy testing and understanding of the endpoints.
- **Prisma**: A modern database toolkit for TypeScript and Node.js.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Yarn](https://yarnpkg.com/) (optional, but recommended)
- [Docker](https://www.docker.com/) (for running the app in a container)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   If you are using Yarn:

   ```bash
   yarn install
   ```

   Or with npm:

   ```bash
   npm install
   ```

### Running the Application

#### Without Docker

1. Start the API:

   ```bash
   yarn start
   ```

   For development mode (with automatic restarts):

   ```bash
   yarn dev
   ```

### with Docker Compose

To run the application along with a PostgreSQL database using Docker Compose, follow these steps:

1. Build and start the services:

   ```bash
   docker-compose up --build
   ```

2. Access the API at:

   ```
   http://localhost:3000
   ```

3. To stop the services, press `Ctrl + C` in the terminal where Docker Compose is running, or run:

   ```bash
   docker-compose down
   ```

### Database Connection

The API connects to the PostgreSQL database using the following connection string:


### API Documentation

You can access the API documentation and test the endpoints via Swagger at:

http://localhost:3000/api-docs

### Linting

To check the code for linting issues, run:

```bash
yarn lint
```

### API Integration Tests

To check the API integration, run:

```bash
yarn test
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## TODO

- Add more tests
- Add more endpoints
- Security with JWT
- Add middleware to validate the user is logged in
- Add more error handling
- Add more logging

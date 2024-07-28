# Supply Chain Track and Trace - Back End

This is the back-end API for the Supply Chain Track and Trace system. It provides endpoints for managing items and their events in a supply chain.

## Features

- Create, read, update, and delete items
- Add events to items
- Search for items by name
- Retrieve item details and event history

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

   The API will be available at `http://localhost:3000` by default.

## API Endpoints

- `POST /items`: Create a new item
- `GET /items/:id`: Get item details
- `PUT /items/:id`: Update an item
- `GET /items/:id/events`: Get all events for an item
- `POST /items/:id/events`: Add a new event to an item
- `GET /items/search`: Search for items by name

## Project Structure

- `src/controllers/`: Contains controller functions for handling requests
- `src/models/`: Defines data models for items and events
- `src/routes/`: Defines API routes
- `src/index.ts`: Entry point for the application

## API Documentation

This project uses OpenAPI (Swagger) for API documentation. You can access the API documentation by following these steps:

1. Start the server (as described in the "Getting Started" section).
2. Open your browser and navigate to `http://localhost:3000/api-docs`.

The OpenAPI specification is defined in the `openapi.yaml` file in the root directory of the project.

## Docker

To run the application using Docker:

1. Build the Docker image:
   ```
   docker build -t supply-chain-api .
   ```

2. Run the Docker container:
   ```
   docker run -p 3000:3000 supply-chain-api
   ```

The API will be available at `http://localhost:3000`, and the API documentation can be accessed at `http://localhost:3000/api-docs`.
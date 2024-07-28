# Supply Chain Track and Trace - Front End

This is the front-end application for the Supply Chain Track and Trace system. It's built using Next.js and provides a user interface for managing and tracking items in a supply chain.

## Features

- Search for items by ID or name
- Add new items to the system
- View and update item details
- Add events to track item movement
- View item event history

## Getting Started

1. Clone the repository and navigate to the `supply-chain-web` directory.

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) with your browser to see the application.

## Usage

### Searching for Items

The application supports two types of searches:

1. Search by ID: To search for an item by its ID, prefix the ID with a '#' symbol. For example:
   ```
   #1234
   ```
   OR
    ```
   #item1
   ```

2. Search by Name: To search for items by name, simply enter the name or part of the name without any prefix. For example:
   ```
   Shoes
   ```

This search will return all items that have "Shoes" in their name.

## Project Structure

- `src/app/page.tsx`: Main page component
- `src/components/`: Contains reusable components like ItemSearch, ItemDetails, AddItemForm, and AddEventForm
- `src/lib/api.ts`: API functions for communicating with the backend

## Docker

To run the application using Docker:

1. Build the Docker image:
   ```
   docker build -t supply-chain-web .
   ```

2. Run the Docker container:
   ```
   docker run -p 3001:3001 supply-chain-web
   ```

The application will be available at `http://localhost:3001`.
import express from 'express';
import { json } from 'body-parser';
import itemRoutes from './routes/itemRoutes';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Load OpenAPI specification
const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));

// CORS middleware to allow requests from the web app
app.use(
    cors({
        origin: 'http://localhost:3001',
    })
);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount the item routes
app.use('/api/items', itemRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(
        `API documentation available at http://localhost:${PORT}/api-docs`
    );
});

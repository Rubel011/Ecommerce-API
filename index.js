const express = require('express');
const cors= require('cors');
const app = express();
const port = process.env.PORT || 1500;
require("dotenv").config();
const { connection } = require('./configs/db');
const { userRouter } = require('./routes/userRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configs/swaggerConfig'); // Import the Swagger configuration
const { productRouter } = require('./routes/productRoute');
const { categoryRouter } = require('./routes/categoryRoute');
const { orderRouter } = require('./routes/orderRoute');


// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




// Home route
app.get("/", async (req, res) => {
    try {
        res.status(200).json({ success: "This is the home page running successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route for user-related endpoints
app.use("/users", userRouter);

// Route for Product-related endpoints
app.use("/products", productRouter);

// Route for category-related endpoints
app.use("/categories", categoryRouter);

// Route for product-related endpoints
app.use("/orders", orderRouter);

// Start the server
app.listen(port, async() => {
    try {
        // Establish database connection
        await connection;

        // Server listening message
        console.log({ message: `Server is listening on port ${port}` });
    } catch (error) {
        console.log(error.message);
    }
});

const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;
const { connection } = require("./src/configs/db");
const { userRouter } = require("./src/routes/userRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/configs/swaggerConfig");
const { productRouter } = require("./src/routes/productRoute");
const { categoryRouter } = require("./src/routes/categoryRoute");
const { orderRouter } = require("./src/routes/orderRoute");

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors());

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Home route
app.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .json({ success: "This is the home page running successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
app.use("/health-check", (req, res) => {
  res.status(200).send("OK");
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
app.listen(port, async () => {
  try {
    // Establish database connection
    await connection;

    // Server listening message
    console.log({ message: `Server is listening on port ${port}` });
  } catch (error) {
    console.log(error.message);
  }
});

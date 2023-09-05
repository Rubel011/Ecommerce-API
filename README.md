# Ecommerce API

Welcome to the Ecommerce API! This API provides authentication, product management, and order management functionalities.

## API Documentation

You can explore the API documentation using Swagger UI. Access the documentation by navigating to:
    https://ecommerce-api-8iaf.onrender.com/api-docs

## Functionality

The API includes the following functionality:
- User Registration
- User Login and Authentication
- User Logout with Token Blacklisting
- Product Management- create , update, delete
- Order Management- new Order, get Orders

## Backend Deployment

The backend of this project is deployed and can be accessed via the following link: [Backend Deployment Link](https://ecommerce-api-8iaf.onrender.com/)


## Backend Routes
- **User Authentication**:
  - `POST /users/register`: Register a new user.
  - `POST /users/login`: Log in with a registered user.
  - `GET /users/profile`: Get the user's profile (protected route using JWT).
  - `POST /users/logout`: Log out the user.

- **Product Management**:
  - `GET /products/category/:categoryId`: Get products by category.
  - `GET /products/getAll`: Get all products.
  - `GET /products/:id`: Get a specific product.
  - `POST /products/create`: Create a new product.
  - `DELETE /products/:productId`: Delete a product.

- **Order Management**:
  - `POST /orders/order_place`: Place a new order.
  - `GET /orders/order_history`: Get order history.
  - `GET /orders/:id`: Get a specific order.

## Installation

To get started with the Ecommerce API, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Rubel011/Ecommerce-API.git

2. Install the required npm packages:
    ```
    cd Ecommerce-API
    npm install
    ```

3. Set up environment variables:
    - Create a .env file in the project root and configure the following variables:
    ```
    PORT=1500
    mongoUrl=mongodb://localhost/your-database-name
    JWT_SECRET=your-secret-key
    saltRounds=15
    ```

4. Start the server:
    ```
    npm start


5. Access the backend API at http://localhost:PORT.
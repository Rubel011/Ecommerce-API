<div align="center">

# Ecommerce API

</div>

### Welcome to the Ecommerce API — a comprehensive backend solution tailored for modern ecommerce platforms. This API provides robust capabilities to manage user authentication, product inventory, and order processing with efficiency and security. Key functionalities include secure user registration and authentication with token blacklisting, complete product lifecycle management, and seamless order handling, all designed to enhance the backend efficiency of ecommerce systems.

## API Documentation: for Swagger

You can explore the API documentation using Swagger UI. Access the documentation by navigating to:
https://ecommerce-api-1.up.railway.app/api-docs

## Functionality

The API includes the following functionality:

- User Registration
- User Login and Authentication
- User Logout with Token Blacklisting
- Product Management- create , update, delete
- Order Management- new Order, get Orders

## Backend Deployment

The backend of this project is deployed and can be accessed via the following link: [Backend Deployment Link](https://ecommerce-api-1.up.railway.app/)

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

   ```

2. Install the required npm packages:

   ```
   cd Ecommerce-API
   pnpm run install
   ```

3. Set up environment variables:

   - Create a .env file in the project root and configure the following variables:

   ```
   PORT=3001
   mongoUrl=mongodb://localhost/your-database-name
   JWT_SECRET=your-secret-key
   saltRounds=15
   ```

4. Start the server:

   ```
   pnpm run start
   ```

5. Access the backend API at http://localhost:PORT.

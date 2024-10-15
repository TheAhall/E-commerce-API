# **E-Commerce API**

This project is a RESTful API for an e-commerce platform, offering key features such as user authentication, product management, and payment processing using Stripe. It is built with Node.js, Express, and MongoDB, and is designed to be secure, scalable, and easy to use.

## **Features**
- **User Authentication**: Register and log in with either email or username, secured with JWT tokens.
- **Product Management**: Admins can create, update, and delete products, with support for image uploads.
- **Payment Processing**: Stripe integration allows users to purchase multiple products and handles payment securely.
- **Protected Routes**: User-specific and admin-specific routes protected by JWT authentication.
- **Stock Management**: Products have stock tracking that is updated upon purchase.

## **Technologies Used**
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for managing data.
- **Mongoose**: MongoDB object modeling for seamless database operations.
- **JWT (JSON Web Tokens)**: For user authentication and route protection.
- **Multer**: Middleware for handling image uploads.
- **Stripe**: Payment gateway for handling purchases.

## **Getting Started**

### **Installation**
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/ecommerce-api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ecommerce-api
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```

### **Environment Variables**
Create a `.env` file in the root directory and add the following:

```env
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### **Run the Project**
Start the development server:

```bash
npm start
```

## **API Endpoints**

### **User Authentication**
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Log in with email or username.

### **Product Management**
- `GET /api/products` - Fetch all products.
- `GET /api/products/:id` - Fetch a single product by ID.
- `POST /api/products/create` - Add a new product (Admin).
- `PUT /api/products/:id` - Update a product (Admin).
- `DELETE /api/products/:id` - Delete a product (Admin).

### **Purchases**
- `POST /api/purchase` - Purchase products, requires user authentication.

## **Testing**
Run tests using:

```bash
npm test
```

## **License**
This project is licensed under the MIT License.
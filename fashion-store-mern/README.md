# Fashion Store - MERN Stack E-Commerce Website

A stylish and modern e-commerce platform for fashion products, built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Responsive, modern UI with animations and gradient backgrounds
- Product catalog with detailed product pages
- Shopping cart functionality
- User authentication and profile management
- Checkout process
- Admin panel for product and order management
- RESTful API backend

## Tech Stack

### Frontend
- React 19
- React Router Dom 6
- Redux Toolkit & React-Redux
- Bootstrap 5 & React-Bootstrap
- Framer Motion for animations
- Axios for API requests
- React Icons

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Cors for cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js (v14 or above)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/fashion-store-mern.git
cd fashion-store-mern
```

2. Install dependencies for the main project, client, and server
```bash
npm run install-all
```

3. Create a `.env` file in the server directory and add your MongoDB connection string and JWT secret
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Start the development server (both frontend and backend)
```bash
npm run dev
```

### Running in Production
1. Build the client
```bash
cd client
npm run build
```

2. Set the NODE_ENV to production in your .env file
```
NODE_ENV=production
```

3. Start the server
```bash
npm start
```

## Project Structure

```
fashion-store-mern/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # Source files
│       ├── components/     # React components
│       ├── pages/          # Page components
│       ├── redux/          # Redux state management
│       └── assets/         # Images, styles, etc.
├── server/                 # Node.js backend
│   ├── config/             # Server configuration
│   ├── controllers/        # Request controllers
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── index.js            # Server entry point
└── package.json            # Project dependencies and scripts
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate user & get token
- `GET /api/users/profile` - Get user profile

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/myorders` - Get logged in user orders
- `PUT /api/orders/:id/pay` - Update order to paid

## License

MIT

## Acknowledgements

- Images from [Unsplash](https://unsplash.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/) 
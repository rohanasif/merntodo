# MERN Todo List App

This is a simple Todo List application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It includes functionality for user authentication/registration and CRUD operations for managing todos.

# Features

User Authentication and Registration: Users can sign up for a new account and log in securely.
Todo Management: Users can add, edit, toggle (mark as completed/incomplete), and delete todos.
Responsive Design: The application is designed to work seamlessly on both desktop and mobile devices.

# Technologies Used

Frontend: React.js, React Router, RTK Query and TailwindCSS.
Backend: Node.js, Express.js, MongoDB, Mongoose and Nodemon.
Authentication: JSON Web Tokens (JWT), bcryptjs for password hashing.
Deployment: Vercel(frontend), Render(backend).

# Installation

Clone the repository:

git clone https://github.com/rohanasif/merntodo.git
cd merntodo
Install dependencies for both frontend and backend:

# Install backend dependencies

cd to the root directory
npm install

# Install frontend dependencies

cd /frontend
npm install

# Set up environment variables:

In the backend directory, create a .env file and add the following:

PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Start backend server

cd to the root directory
npm run server

# Start frontend server

cd /frontend
npm run dev

# Usage

Navigate to http://localhost:5173 in your web browser.
Register for a new account or log in if you already have one.
Start managing your todos by adding, editing, toggling, or deleting them.

# License

This project is licensed under the MIT License.

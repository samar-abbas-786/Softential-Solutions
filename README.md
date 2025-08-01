# Softential Solutions

**Customer Management System - Trial Project**

## Overview

Softential Solutions is a web-based Customer Management System designed to efficiently manage customer data, profiles, and authentication. The project consists of a full-stack application built with a React frontend and Node.js/Express backend, utilizing MongoDB for data storage.

## Features

- **User Authentication:** Secure login/logout, password change, JWT-based session management.
- **Customer Management:** Add, edit, delete, and list customers with advanced filtering by state and city.
- **Profile Picture Upload:** Customers can have profile images uploaded and stored securely.
- **Data Export:** Export customer data to CSV/Excel for reporting.
- **Pagination & Filtering:** Robust client-side pagination and search/filter features for customer lists.
- **Admin User Seeding:** Default admin account setup for initial access.
- **Health Checks & API Endpoints:** Backend endpoints for server health, authentication, and customer management.

## Technology Stack

- **Frontend:** React, React Router, Axios, Toastify (notifications)
- **Backend:** Node.js, Express, MongoDB, Mongoose, Multer (file uploads), JWT (authentication)
- **Utilities:** CSV export via custom utility or libraries
- **Styling:** Custom CSS (with support for responsive layouts)

## Directory Structure

```
backend/           # Node.js/Express API, authentication, customer controllers, middleware
frontend/          # React application, components, context, services
uploads/           # Profile image storage
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database

### Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Configure environment variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/customer_management
   JWT_SECRET=your_secret_key
   ```
3. Seed the database with the default admin user:
   ```bash
   node seedDatabase.js
   ```
   - Default credentials:
     - Username: `admin`
     - Password: `admin123`
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Set API URL in `.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
3. Start the React app:
   ```bash
   npm start
   ```

## Usage

- Open `http://localhost:3000` in your browser.
- Log in with the seeded admin credentials.
- Manage customer data, upload profiles, filter and export records.

## API Endpoints

- `/api/auth`: Authentication operations (login, password change)
- `/api/customers`: Customer CRUD operations, export
- `/health`: Server health check

## Security Notes

- Passwords are securely hashed and stored.
- JWT tokens are used for authentication and protected routes.
- Profile picture uploads are validated for file type and size.

## License

This project is currently not licensed for commercial use.

## Author

- [samar-abbas-786](https://github.com/samar-abbas-786)

---
For issues or contributions, please open a GitHub issue or pull request.

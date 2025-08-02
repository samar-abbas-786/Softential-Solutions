# Softential Solutions - Detailed Project Report

## 1. Overview

Softential Solutions is a comprehensive web-based Customer Management System designed to help organizations efficiently manage customer data, profiles, and authentication. The project is structured as a full-stack application with a modern technology stack and strong focus on usability, security, and extensibility.

## 2. Purpose & Objectives

- **Centralized Customer Data:** Enables businesses to store, update, and manage customer information in one place.
- **Secure User Management:** Provides robust authentication and authorization for admin users.
- **Efficient Operations:** Streamlines workflows for adding, editing, deleting, and searching customers.

## 3. Technology Stack

- **Frontend:**  
  - React  
  - React Router  
  - Axios (API requests)  
  - Toastify (notifications)  
  - Custom CSS (responsive layouts)
- **Backend:**  
  - Node.js  
  - Express  
  - MongoDB (Mongoose ODM)  
  - Multer (file upload handling)  
  - JWT (authentication)
- **Utilities:**  
  - Custom CSV export  
  - Utility functions for export and modal dialogs

## 4. Directory Structure

```
backend/   # Node.js/Express API, authentication, customer controllers, middleware
frontend/  # React application, components, context, services
uploads/   # Profile image storage
```

## 5. Key Features

### a. User Authentication
- Secure login/logout
- Password change
- JWT-based session management
- Protected routes for sensitive operations

### b. Customer Management
- Add, edit, and delete customer records
- List and filter customers by name, email, contact, state, and city
- Profile picture upload and storage
- Data validation (email, contact number, DOB)
- Feedback via toast notifications

### c. Customer List Component
- Paginated table of customer records
- Displays key info: profile picture, name, email, contact, state, city, registration date
- Robust pagination: client-side state management, dynamic page buttons
- Filtering: by search (partial/case-insensitive), state, city (all fields controlled inputs)
- Deletion: confirmation modal, backend DELETE, feedback and auto-refresh
- Export: CSV and Excel buttons, exports respect current filters, loading spinner and notifications

### d. Data Export
- Export customer data to CSV/Excel for reporting
- Export utility functions format and trigger file downloads
- Only matching/filter-applied customers are exported

### e. Admin User Seeding
- Default admin account seeded for initial access
- Credentials: Username `admin` / Password `admin123`

### f. API Endpoints
- `/api/auth`: Authentication operations (login, password change)
- `/api/customers`: Customer CRUD operations, export
- `/health`: Server health check

### g. Security
- Passwords securely hashed and stored
- JWT tokens for authentication and protected routes
- Profile picture uploads validated for file type/size

## 6. Usage & Getting Started

### Prerequisites
- Node.js and npm
- MongoDB database

### Backend Setup
1. Install dependencies:  
   `cd backend && npm install`
2. Configure `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/customer_management
   JWT_SECRET=your_secret_key
   ```
3. Seed database with admin user:  
   `node seedDatabase.js`
4. Start backend:  
   `npm start`

### Frontend Setup
1. Install dependencies:  
   `cd frontend && npm install`
2. Set API URL in `.env`:  
   `REACT_APP_API_URL=http://localhost:5000/api`
3. Start React app:  
   `npm start`

### Typical Workflow
- Open `http://localhost:3000` in browser
- Log in with admin credentials
- Add, edit, delete, filter, and export customer records

## 7. Core Implementation Details

### Customer Schema (MongoDB)
- Fields: fullName, email, contactNumber, dateOfBirth, profilePicture, state, city, isActive, createdBy
- Validations: email format, contact number format, DOB in the past
- Indexes for text search and optimized queries

### Filtering Logic
- Controlled inputs for search, state, city
- Backend supports regex matching (partial/case-insensitive) across name, email, contact

### Pagination Implementation
- State-managed pagination: currentPage, totalPages, total
- Dynamic page buttons, disables at boundaries
- Fetches paginated data from backend

### Export Functionality
- Buttons for CSV and Excel
- Export respects filters
- Uses utility functions for generating files
- Filename includes current date

### Delete Confirmation Modal
- Modal shows customer name and prompt
- Actions: cancel or delete (API call)
- Feedback and auto-refresh on success/error

## 8. References (Key Source Files)
- [CustomerList.js](https://github.com/samar-abbas-786/Softential-Solutions/blob/main/frontend/src/components/Customer/CustomerList.js)
- [exportUtils.js](https://github.com/samar-abbas-786/Softential-Solutions/blob/main/frontend/src/utils/exportUtils.js)
- [customerController.js](https://github.com/samar-abbas-786/Softential-Solutions/blob/main/backend/controllers/customerController.js)
- [README.md](https://github.com/samar-abbas-786/Softential-Solutions/blob/main/README.md)

## 9. Suggestions for Future Enhancements

1. **Import CSV/Excel Functionality**
   - Allow bulk import of customer data from CSV/Excel files instead of manual entry.
   - Automate validation and error reporting for uploaded files.
   - Map columns to customer fields, handle duplicates, and provide import summary.

2. **Debounce Search Input**
   - Improve performance by reducing unnecessary API calls during rapid typing.

3. **Advanced Filters**
   - Add date range, registration status, and multi-field filtering.

4. **Role-Based Access**
   - Restrict actions (delete/export) based on user roles/permissions.

5. **Bulk Actions**
   - Bulk delete/export selected customers.

6. **UI/UX Improvements**
   - Expandable rows for more customer details, tooltips, and improved mobile responsiveness.

7. **Accessibility**
   - Enhance keyboard navigation and ARIA support.

8. **Error Handling**
   - More granular feedback and fallback UI for failed exports or deletes.

9. **Excel Export Enhancements**
   - Switch to a true Excel export library for richer spreadsheet features.

---

## 10. Author & License

- [samar-abbas-786](https://github.com/samar-abbas-786)
- [m-atharkhan](https://github.com/m-atharkhan)
- **License:** Not licensed for commercial use.

---

For further details, issues, or contributions, please refer to the [GitHub repository](https://github.com/samar-abbas-786/Softential-Solutions).

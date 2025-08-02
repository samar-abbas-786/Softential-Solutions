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
- [m-atharkhan](https://github.com/m-atharkhan)


---
For issues or contributions, please open a GitHub issue or pull request.

# REPORT
# Customer List Component Report

## Overview

The Customer List component in the Softential Solutions project is a core feature for managing customer records. It provides an interactive interface for listing, filtering, paginating, exporting, and deleting customer data. Designed for admin users, it streamlines customer management with intuitive controls and clear feedback mechanisms.

---

## Key Features

### 1. Customer Listing
- Displays customer records in a paginated table.
- Shows profile picture, name, email, contact, state, city, registration date, and action buttons (edit/delete).
- Handles empty states and loading overlays for better UX.

### 2. Pagination
- Supports client-side pagination.
- Displays navigation buttons (Previous, numbered pages, Next).
- Maximum of 5 visible page buttons at a time for clarity.
- Pagination state is managed via React `useState`, and updates trigger customer refetch.

### 3. Filtering
- Three filter fields: Search (by name/email/contact), State, and City.
- Filters are managed in the state and trigger data refresh on change.
- Search field supports flexible matching (partial, case-insensitive).
- All filter changes reset pagination to the first page for consistency.

### 4. Deleting Customers
- Delete action triggers a confirmation modal.
- On confirmation, sends a DELETE request to the backend.
- Feedback provided via toast notifications (success/error).
- List is automatically refreshed after deletion.

### 5. Export Functionality
- Export buttons for CSV and Excel formats.
- Export respects current filters, exporting only matching customers.
- Shows loading spinner during export.
- Uses utility functions to format and trigger file downloads.
- Success/error feedback via toast notifications.

---

## Filtering Logic

- All filter fields (`search`, `state`, `city`) are controlled inputs.
- When any filter changes, `handleFilterChange` updates state and resets page to 1.
- `useEffect` listens for changes in filters or current page, triggering `fetchCustomers`.
- Search queries are sent to the backend, which matches name, email, or contact fields using regex.
- Filtering is case-insensitive and partial-match enabled.

**Backend filtering example:**
```js
if (search) {
  query.$or = [
    { fullName: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } },
    { contactNumber: { $regex: search, $options: 'i' } }
  ];
}
```

---

## Pagination Implementation

- Pagination state: `currentPage`, `totalPages`, `total`.
- Changing page updates state and triggers a new data fetch.
- Page buttons are rendered dynamically based on current page and total pages.
- Next/Previous are disabled at boundaries (first/last page).
- Each customer fetch includes pagination info from the backend.

---

## Modals for Delete Confirmation

- Delete action sets modal state (`isOpen`, `customerId`, `customerName`).
- Modal displays customer name and confirmation prompt.
- Cancel and Delete buttons: Cancel closes modal, Delete triggers API call.
- Success/error feedback via toast; modal and list update accordingly.

---

## Export Functionality (CSV & Excel)

- Two buttons: Export CSV and Export Excel.
- Export respects current filters (search, state, city).
- CSV export uses `exportToCSV` utility to format and download file.
- Excel export (for simplicity) downloads CSV with `.xlsx` extension. For true Excel export, a library like `xlsx` is recommended.
- Filename includes current date.
- Loading spinner on export, toast notifications for outcome.

---

## Dependencies & Utilities Used

- **api service**: For HTTP requests to backend (`api.get`, `api.delete`).
- **exportToCSV / exportToExcel**: Utility functions for file generation and download.
- **toast (react-toastify)**: User feedback for actions (success/error).
- **LoadingSpinner**: Visual loader during async operations.
- **Modal**: Reusable modal component for confirmation dialogs.
- **React Router (`Link`)**: For navigation to edit/add screens.

---

## Suggestions for Future Enhancements

1. **Debounce Search Input**
   - Implement debounce in search field to reduce unnecessary API calls and improve performance.

2. **Advanced Filters**
   - Add more filter options (date range, registration status, etc.).
   - Support multi-field and compound filtering.

3. **Role-Based Access**
   - Restrict actions (delete/export) based on user roles/permissions.

4. **UI Improvements**
   - Add bulk actions (delete/export multiple customers).
   - Improve mobile responsiveness.
   - Show more customer details via expandable rows or tooltips.

5. **Export Improvements**
   - Use a true Excel export library for richer spreadsheet features.
   - Allow exporting selected or visible rows only.

6. **Accessibility**
   - Improve keyboard navigation and ARIA support for modals and tables.

7. **Error Handling**
   - Add more granular error handling and fallback UI for failed exports or deletes.

---

## References

- [CustomerList.js](https://github.com/samar-abbas-786/Softential-Solutions/blob/main/frontend/src/components/Customer/CustomerList.js)
- [exportUtils.js](https://github.com/samar-abbas-786/Softential-Solutions/blob/main/frontend/src/utils/exportUtils.js)
- [customerController.js](https://github.com/samar-abbas-786/Softential-Solutions/blob/main/backend/controllers/customerController.js)
- [README.md](https://github.com/samar-abbas-786/Softential-Solutions/blob/main/README.md)




// frontend/src/components/Customer/CustomerList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { exportToCSV } from "../../utils/exportUtils";
import LoadingSpinner from "../Common/LoadingSpinner";
import Modal from "../Common/Modal";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    state: "",
    city: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    customerId: null,
    customerName: "",
  });
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, [filters, pagination.currentPage]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10,
        search: filters.search,
        state: filters.state,
        city: filters.city,
      });

      const response = await api.get(`/customers?${queryParams}`);
      setCustomers(response.data.customers);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total,
      });
    } catch (error) {
      console.error("Fetch customers error:", error);
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
  };

  const handleDeleteClick = (customer) => {
    setDeleteModal({
      isOpen: true,
      customerId: customer._id,
      customerName: customer.fullName,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/customers/${deleteModal.customerId}`);
      toast.success("Customer deleted successfully");
      setDeleteModal({ isOpen: false, customerId: null, customerName: "" });
      fetchCustomers();
    } catch (error) {
      console.error("Delete customer error:", error);
      toast.error("Failed to delete customer");
    }
  };

  const handleExport = async (format) => {
    try {
      setExportLoading(true);
      const queryParams = new URLSearchParams({
        search: filters.search,
        state: filters.state,
        city: filters.city,
      });

      const response = await api.get(`/customers/export?${queryParams}`);
      const filename = `customers_${
        new Date().toISOString().split("T")[0]
      }.${format}`;

      if (format === "csv") {
        exportToCSV(response.data, filename);
      } else {
        exportToCSV(response.data, filename.replace(".xlsx", ".csv"));
      }

      toast.success(
        `Customers exported successfully as ${format.toUpperCase()}`
      );
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export customers");
    } finally {
      setExportLoading(false);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      pagination.currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisiblePages - 1
    );

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${
            pagination.currentPage === i ? "active" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    );
  };

  if (loading && customers.length === 0) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="customer-list-container">
      <div className="page-header">
        <h2>Customer Management</h2>
        <div className="header-actions">
          <Link to="/customers/new" className="btn btn-primary">
            Add New Customer
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="filter-group">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by name, email, or contact..."
              className="form-control"
            />
          </div>
          <div className="filter-group">
            <input
              type="text"
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              placeholder="Filter by state..."
              className="form-control"
            />
          </div>
          <div className="filter-group">
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder="Filter by city..."
              className="form-control"
            />
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="export-section">
        <div className="export-info">
          <span>Total Customers: {pagination.total}</span>
        </div>
        <div className="export-buttons">
          <button
            onClick={() => handleExport("csv")}
            disabled={exportLoading}
            className="btn btn-outline"
          >
            {exportLoading ? <LoadingSpinner size={16} /> : "Export CSV"}
          </button>
          <button
            onClick={() => handleExport("xlsx")}
            disabled={exportLoading}
            className="btn btn-outline"
          >
            {exportLoading ? <LoadingSpinner size={16} /> : "Export Excel"}
          </button>
        </div>
      </div>

      {/* Customer Table */}
      {loading ? (
        <div className="loading-overlay">
          <LoadingSpinner />
        </div>
      ) : customers.length === 0 ? (
        <div className="no-data">
          <p>No customers found</p>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Registration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td>
                      {customer.profilePicture ? (
                        <img
                          src={`http://localhost:3000${customer.profilePicture}`}
                          alt={customer.fullName}
                          className="profile-image-small"
                        />
                      ) : (
                        <div className="profile-placeholder">
                          {customer.fullName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td>{customer.fullName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.contactNumber}</td>
                    <td>{customer.state}</td>
                    <td>{customer.city}</td>
                    <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/customers/edit/${customer._id}`}
                          className="btn btn-sm btn-outline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(customer)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && renderPagination()}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, customerId: null, customerName: "" })
        }
        title="Confirm Delete"
      >
        <div className="delete-confirmation">
          <p>
            Are you sure you want to delete customer{" "}
            <strong>{deleteModal.customerName}</strong>?
          </p>
          <p>This action cannot be undone.</p>
          <div className="modal-actions">
            <button
              onClick={() =>
                setDeleteModal({
                  isOpen: false,
                  customerId: null,
                  customerName: "",
                })
              }
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button onClick={handleDeleteConfirm} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerList;

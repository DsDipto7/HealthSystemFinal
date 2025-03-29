import React, { useState } from 'react';
import ProductTable from './ProductTable';
import ServiceTable from './ServiceTable';
import ContactTable from './ContactTable';
import PrescriptionTable from './PrescriptionTable';
import TransactionsTable from './TransactionsTable'; // Import the new TransactionsTable component
// import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');

    const renderContent = () => {
        switch (activeTab) {
          case "products":
            return <ProductTable />;
          case "services":
            return <ServiceTable />;
          case "contacts":
            return <ContactTable />;
          case "prescriptions":
            return <PrescriptionTable />;
          case "transactions":
            return <TransactionsTable />;
          default:
            return <ProductTable />;
        }
    };

    return (
      <div className="admin-dashboard">
        <div className="sidebar">
          <h2>Admin Dashboard</h2>
          <div className="tab-buttons">
            <button
              className={`tab-button ${
                activeTab === "products" ? "active" : ""
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`tab-button ${
                activeTab === "services" ? "active" : ""
              }`}
              onClick={() => setActiveTab("services")}
            >
              Services
            </button>
            <button
              className={`tab-button ${
                activeTab === "contacts" ? "active" : ""
              }`}
              onClick={() => setActiveTab("contacts")}
            >
              Contacts
            </button>
            <button
              className={`tab-button ${
                activeTab === "prescriptions" ? "active" : ""
              }`}
              onClick={() => setActiveTab("prescriptions")}
            >
              Prescriptions
            </button>

            <button
              className={`tab-button ${
                activeTab === "transactions" ? "active" : ""
              }`}
              onClick={() => setActiveTab("transactions")}
            >
              Transactions
            </button>
          </div>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    );
};

export default AdminDashboard; 
import React, { useEffect, useState } from "react";
import "./ContactTable.css"; // Custom CSS for styling

export default function ContactTable() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/contact-list/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="contact-table-container">
        <h2 className="contact-table-title">Contact Messages</h2>
        <div className="contact-table-loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contact-table-container">
        <h2 className="contact-table-title">Contact Messages</h2>
        <div className="contact-table-error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="contact-table-container">
      <h2 className="contact-table-title">Contact Messages</h2>
      <div className="contact-table-wrapper">
        <table className="contact-table">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <tr key={contact.id}>
                  <td>{index + 1}</td>
                  <td>{contact.first_name}</td>
                  <td>{contact.last_name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="contact-table-no-data">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

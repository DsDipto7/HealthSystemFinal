// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './PrescriptionTable.css';

// // const PrescriptionTable = () => {
// //     const [prescriptions, setPrescriptions] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         fetchPrescriptions();
// //     }, []);

// //     const fetchPrescriptions = async () => {
// //         try {
// //             const response = await axios.get('http://127.0.0.1:8000/api/prescriptions/', {
// //                 headers: {
// //                     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
// //                 },
// //             });
// //             setPrescriptions(response.data);
// //             setLoading(false);
// //         } catch (error) {
// //             console.error('Error fetching prescriptions:', error);
// //             toast.error('Failed to fetch prescriptions');
// //             setLoading(false);
// //         }
// //     };

// //     const handleDelete = async (id) => {
// //         if (window.confirm('Are you sure you want to delete this prescription?')) {
// //             try {
// //                 await axios.delete(`http://127.0.0.1:8000/api/prescriptions/${id}/delete/`, {
// //                     headers: {
// //                         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
// //                     },
// //                 });
// //                 toast.success('Prescription deleted successfully');
// //                 fetchPrescriptions(); // Refresh the list
// //             } catch (error) {
// //                 console.error('Error deleting prescription:', error);
// //                 toast.error('Failed to delete prescription');
// //             }
// //         }
// //     };

// //     if (loading) {
// //         return <div>Loading prescriptions...</div>;
// //     }

// //     return (
// //         <div className="prescription-table-container">
// //             <ToastContainer />
// //             <h2>Prescription Management</h2>
// //             <div className="table-responsive">
// //                 <table className="prescription-table">
// //                     <thead>
// //                         <tr>
// //                             <th>ID</th>
// //                             <th>Full Name</th>
// //                             <th>Phone Number</th>
// //                             <th>Email</th>
// //                             <th>Prescription</th>
// //                             <th>Date</th>
// //                             <th>Status</th>
// //                             <th>Actions</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {prescriptions.map((prescription) => (
// //                             <tr key={prescription.id}>
// //                                 <td>{prescription.id}</td>
// //                                 <td>{prescription.full_name}</td>
// //                                 <td>{prescription.phone_number}</td>
// //                                 <td>{prescription.email}</td>
// //                                 <td>
// //                                     <a 
// //                                         href={`http://127.0.0.1:8000${prescription.prescription_image}`} 
// //                                         target="_blank" 
// //                                         rel="noopener noreferrer"
// //                                     >
// //                                         View Prescription
// //                                     </a>
// //                                 </td>
// //                                 <td>{new Date(prescription.created_at).toLocaleDateString()}</td>
// //                                 <td>{prescription.status}</td>
// //                                 <td>
// //                                     <button
// //                                         className="delete-btn"
// //                                         onClick={() => handleDelete(prescription.id)}
// //                                     >
// //                                         Delete
// //                                     </button>
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     );
// // };

// // export default PrescriptionTable; 


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PrescriptionTable = () => {
//   const [prescriptions, setPrescriptions] = useState([]);

//   useEffect(() => {
//     fetchPrescriptions();
//   }, []);

//   const fetchPrescriptions = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/prescriptions/"
//       );
//       setPrescriptions(response.data);
//     } catch (error) {
//       console.error("Error fetching prescriptions:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this prescription?"))
//       return;

//     try {
//       await axios.delete(`http://localhost:8000/api/prescriptions/${id}/`);
//       setPrescriptions(
//         prescriptions.filter((prescription) => prescription.id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting prescription:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Prescription List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Email</th>
//             <th>Prescription</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {prescriptions.map((prescription) => (
//             <tr key={prescription.id}>
//               <td>{prescription.name}</td>
//               <td>{prescription.phone}</td>
//               <td>{prescription.email}</td>
//               <td>
//                 <img
//                   src={prescription.prescription}
//                   alt="Prescription"
//                   width="100"
//                 />
//               </td>
//               <td>
//                 <button onClick={() => handleDelete(prescription.id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PrescriptionTable;
import React, { useEffect, useState } from "react";
import "./PrescriptionTable.css"; // Custom CSS for styling

export default function PrescriptionTable() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/prescription/list/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPrescriptions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Prescriptions</h2>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Prescriptions</h2>
        <div className="text-center text-danger">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Prescriptions</h2>
      <div className="table-responsive">
        <table className="table table-hover custom-table">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Prescription Image</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.length > 0 ? (
              prescriptions.map((prescription, index) => (
                <tr key={prescription.id}>
                  <td>{index + 1}</td>
                  <td>{prescription.full_name}</td>
                  <td>{prescription.phone_number}</td>
                  <td>{prescription.email}</td>
                  <td>
                    <img
                      src={`http://127.0.0.1:8000${prescription.prescription_image}`}
                      alt="Prescription"
                      className="img-thumbnail"
                      width="100"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
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

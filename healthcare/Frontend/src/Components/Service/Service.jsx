// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Service.css"; // Import custom CSS for styling

// export default function Service() {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/services/");
//       setServices(response.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="service-container">
//       <h2 className="service-title">Our Services</h2>

//       {loading ? (
//         <p className="loading-text">Loading services...</p>
//       ) : services.length > 0 ? (
//         <div className="service-grid">
//           {services.map((service) => (
//             <div className="service-card" key={service.id}>
//               <img
//                 src={`http://127.0.0.1:8000${service.image}`}
//                 alt={service.name}
//                 className="service-image"
//               />
//               <div className="service-details">
//                 <h3 className="service-name">{service.name}</h3>
//                 <p className="service-description">{service.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="no-services">No services available at the moment.</p>
//       )}
//     </div>
//   );
// }


// Service.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Doctor from "../Doctor/Doctor";
import Test from "../Test/Test";
import "./Service.css"; // Import custom CSS for styling

export default function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/services/");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceClick = (serviceName) => {
    setSelectedService(serviceName);
  };

  const renderContent = () => {
    switch (selectedService) {
      case "Doctor":
        return <Doctor />;
      case "Test":
        return <Test />;
      default:
        return (
          <div className="service-grid">
            {services.map((service) => (
              <div
                className="service-card"
                key={service.id}
                onClick={() => handleServiceClick(service.name)}
              >
                <img
                  src={`http://127.0.0.1:8000${service.image}`}
                  alt={service.name}
                  className="service-image"
                />
                <div className="service-details">
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="service-container">
      <h2 className="service-title">Our Services</h2>
      {loading ? <p className="loading-text">Loading services...</p> : renderContent()}
    </div>
  );
}

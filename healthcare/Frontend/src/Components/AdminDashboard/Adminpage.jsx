




// import React, { useState } from "react";
// import ProductManagement from "./ProductManagement";
// import ContactTable from "./ContactTable";
// import ServiceTable from "./ServiceTable"; // Import the Services component
// import CategoryTable from "./CategoryTable";
// import PrescriptionTable from "./PrescriptionTable";
// export default function AdminPage() {
//   const [activeTab, setActiveTab] = useState("home");

//   return (
//     <div className="container-fluid">
//       <div className="row flex-nowrap">
//         <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
//           <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
//             <a
//               href="/"
//               className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
//             >
//               <span className="fs-5 d-none d-sm-inline">Menu</span>
//             </a>
//             <ul
//               className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
//               id="menu"
//             >
//               <li className="nav-item">
//                 <button
//                   className={`nav-link align-middle px-0 ${
//                     activeTab === "home" ? "text-primary" : ""
//                   }`}
//                   onClick={() => setActiveTab("home")}
//                 >
//                   <i className="fs-4 bi-house"></i>
//                   <span className="ms-1 d-none d-sm-inline">Home</span>
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link align-middle px-0 ${
//                     activeTab === "products" ? "text-primary" : ""
//                   }`}
//                   onClick={() => setActiveTab("products")}
//                 >
//                   <i className="fs-4 bi-box"></i>
//                   <span className="ms-1 d-none d-sm-inline">Products</span>
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link align-middle px-0 ${
//                     activeTab === "contacts" ? "text-primary" : ""
//                   }`}
//                   onClick={() => setActiveTab("contacts")}
//                 >
//                   <i className="fs-4 bi-telephone"></i>
//                   <span className="ms-1 d-none d-sm-inline">Contacts</span>
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link align-middle px-0 ${
//                     activeTab === "services" ? "text-primary" : ""
//                   }`}
//                   onClick={() => setActiveTab("services")}
//                 >
//                   <i className="fs-4 bi-briefcase"></i>
//                   <span className="ms-1 d-none d-sm-inline">Services</span>
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link align-middle px-0 ${
//                     activeTab === "services" ? "text-primary" : ""
//                   }`}
//                   onClick={() => setActiveTab("prescriptions")}
//                 >
//                   <i className="fs-4 bi-briefcase"></i>
//                   <span className="ms-1 d-none d-sm-inline">Prescriptions</span>
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link align-middle px-0 ${
//                     activeTab === "categories" ? "text-primary" : ""
//                   }`}
//                   onClick={() => setActiveTab("categories")}
//                 >
//                   <span className="ms-1 d-none d-sm-inline">Categories</span>
//                 </button>
//               </li>
//             </ul>
//             <hr />
//           </div>
//         </div>
//         <div className="col p-4">
//           {activeTab === "home" && <h1>Welcome to Admin Dashboard</h1>}
//           {activeTab === "products" && <ProductManagement />}
//           {activeTab === "contacts" && <ContactTable />}
//           {activeTab === "services" && <ServiceTable />} {/* Render Services */}
//           {activeTab === "categories" && <CategoryTable />}
//           {activeTab === "prescriptions" && <PrescriptionTable />}
//         </div>
//       </div>
//     </div>
//   );
// }








//modified for transactionstable



import React, { useState } from "react";
import ProductManagement from "./ProductManagement";
import ContactTable from "./ContactTable";
import ServiceTable from "./ServiceTable";
import CategoryTable from "./CategoryTable";
import PrescriptionTable from "./PrescriptionTable";
import TransactionsTable from "./TransactionsTable"; // Import TransactionsTable

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <button
                  className={`nav-link align-middle px-0 ${
                    activeTab === "home" ? "text-primary" : ""
                  }`}
                  onClick={() => setActiveTab("home")}
                >
                  <i className="fs-4 bi-house"></i>
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link align-middle px-0 ${
                    activeTab === "products" ? "text-primary" : ""
                  }`}
                  onClick={() => setActiveTab("products")}
                >
                  <i className="fs-4 bi-box"></i>
                  <span className="ms-1 d-none d-sm-inline">Products</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link align-middle px-0 ${
                    activeTab === "contacts" ? "text-primary" : ""
                  }`}
                  onClick={() => setActiveTab("contacts")}
                >
                  <i className="fs-4 bi-telephone"></i>
                  <span className="ms-1 d-none d-sm-inline">Contacts</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link align-middle px-0 ${
                    activeTab === "services" ? "text-primary" : ""
                  }`}
                  onClick={() => setActiveTab("services")}
                >
                  <i className="fs-4 bi-briefcase"></i>
                  <span className="ms-1 d-none d-sm-inline">Services</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link align-middle px-0 ${
                    activeTab === "prescriptions" ? "text-primary" : ""
                  }`}
                  onClick={() => setActiveTab("prescriptions")}
                >
                  <i className="fs-4 bi-prescription"></i>
                  <span className="ms-1 d-none d-sm-inline">Prescriptions</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link align-middle px-0 ${
                    activeTab === "categories" ? "text-primary" : ""
                  }`}
                  onClick={() => setActiveTab("categories")}
                >
                  <i className="fs-4 bi-tags"></i>
                  <span className="ms-1 d-none d-sm-inline">Categories</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link align-middle px-0 ${
                    activeTab === "transactions" ? "text-primary" : ""
                  }`}
                  onClick={() => setActiveTab("transactions")}
                >
                  <i className="fs-4 bi-cash"></i>
                  <span className="ms-1 d-none d-sm-inline">Transactions</span>
                </button>
              </li>
            </ul>
            <hr />
          </div>
        </div>
        <div className="col p-4">
          {activeTab === "home" && <h1>Welcome to Admin Dashboard</h1>}
          {activeTab === "products" && <ProductManagement />}
          {activeTab === "contacts" && <ContactTable />}
          {activeTab === "services" && <ServiceTable />}
          {activeTab === "categories" && <CategoryTable />}
          {activeTab === "prescriptions" && <PrescriptionTable />}
          {activeTab === "transactions" && <TransactionsTable />} {/* Render TransactionsTable */}
        </div>
      </div>
    </div>
  );
}
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AdminPage() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     id: "",
//     name: "",
//     description: "",
//     price: "",
//     image: null, // Change to store File object
//   });

//   // Fetch products on component mount
//   useEffect(() => {
//     fetchProducts();
//   }, []);

// const fetchProducts = async () => {
//   try {
//     const response = await axios.get("http://127.0.0.1:8000/api/products/");
//     console.log("Fetched products:", response.data); // Log the response
//     setProducts(response.data);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     toast.error("Failed to fetch products.");
//   }
// };


//   // Handle input changes for all fields
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setNewProduct((prev) => ({
//         ...prev,
//         image: file, // Save the File object
//       }));
//     }
//   };

//   // Add a new product
//   // const handleAddProduct = async () => {
//   //   if (
//   //     newProduct.id &&
//   //     newProduct.name &&
//   //     newProduct.description &&
//   //     newProduct.price &&
//   //     newProduct.image
//   //   ) {
//   //     const formData = new FormData();
//   //     formData.append("id", newProduct.id);
//   //     formData.append("name", newProduct.name);
//   //     formData.append("description", newProduct.description);
//   //     formData.append("price", newProduct.price);
//   //     formData.append("image", newProduct.image);

//   //     try {
//   //       const response = await axios.post(
//   //         "http://127.0.0.1:8000/api/products/create/",
//   //         formData,
//   //         {
//   //           headers: {
//   //             "Content-Type": "multipart/form-data",
//   //           },
//   //         }
//   //       );
//   //       setProducts((prev) => [...prev, response.data]);
//   //       toast.success("Product added successfully!");

//   //       setNewProduct({
//   //         id: "",
//   //         name: "",
//   //         description: "",
//   //         price: "",
//   //         image: null,
//   //       });
//   //     } catch (error) {
//   //       console.error("Error adding product:", error);
//   //       toast.error("Failed to add product.");
//   //     }
//   //   } else {
//   //     toast.error("Please fill in all fields before adding a product.");
//   //   }
//   // };


//   //amar ta

//   const handleAddProduct = async () => {
//     if (
//       newProduct.id &&
//       newProduct.name &&
//       newProduct.description &&
//       newProduct.price &&
//       newProduct.image
//     ) {
      
// const formData = new FormData();
// formData.append("productId", newProduct.id);
// formData.append("productName", newProduct.name);
// formData.append("productDescription", newProduct.description);
// formData.append("productPrice", newProduct.price);
// formData.append("productImage", newProduct.image);


//       // Log FormData entries
//       console.log("FormData to be sent:", Array.from(formData.entries()));

//       try {
//         const response = await axios.post(
//           "http://127.0.0.1:8000/api/products/create/",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         setProducts((prev) => [...prev, response.data]);
//         toast.success("Product added successfully!");

//         setNewProduct({
//           id: "",
//           name: "",
//           description: "",
//           price: "",
//           image: null,
//         });
//       } catch (error) {
//         console.error(
//           "Error adding product:",
//           error.response?.data || error.message
//         );
//         toast.error(
//           error.response?.data?.detail ||
//             "Failed to add product. Check the input data."
//         );
//       }

//     } else {
//       toast.error("Please fill in all fields before adding a product.");
//     }
//   };


//   return (
//     <div>
//       <ToastContainer position="top-center" autoClose={2000} />
//       <div className="container-fluid">
//         <div className="row flex-nowrap">
//           <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
//             <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
//               <a
//                 href="/"
//                 className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
//               >
//                 <span className="fs-5 d-none d-sm-inline">Menu</span>
//               </a>
//               <ul
//                 className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
//                 id="menu"
//               >
//                 <li className="nav-item">
//                   <a href="/" className="nav-link align-middle px-0">
//                     <i className="fs-4 bi-house"></i>
//                     <span className="ms-1 d-none d-sm-inline">Home</span>
//                   </a>
//                 </li>
//               </ul>
//               <hr />
//             </div>
//           </div>
//           <div className="container mt-4">
//             <h2>Product Table</h2>
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Description</th>
//                   <th>Price</th>
//                   <th>Image</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product) => (
//                   <tr key={product.id}>
//                     <td>{product.id}</td>
//                     <td>{product.name}</td>
//                     <td>{product.description}</td>
//                     <td>{product.price}</td>
//                     <td>
//                       <img src={product.image} alt={product.name} width="50" />
//                     </td>
//                     <td>
//                       <button className="btn btn-warning btn-sm me-2">
//                         Edit
//                       </button>
//                       <button className="btn btn-danger btn-sm">Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <h3>Add New Product</h3>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 name="id"
//                 placeholder="ID"
//                 value={newProduct.id}
//                 onChange={handleInputChange}
//                 className="form-control mb-2"
//               />
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={newProduct.name}
//                 onChange={handleInputChange}
//                 className="form-control mb-2"
//               />
//               <input
//                 type="text"
//                 name="description"
//                 placeholder="Description"
//                 value={newProduct.description}
//                 onChange={handleInputChange}
//                 className="form-control mb-2"
//               />
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={newProduct.price}
//                 onChange={handleInputChange}
//                 className="form-control mb-2"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="form-control mb-2"
//               />
//               <button className="btn btn-primary" onClick={handleAddProduct}>
//                 Add Product
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








//My Friends Code   for add product only 

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: null, // File object for the image
  });

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      console.log("Fetched products:", response.data); // Log API response
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({
        ...prev,
        image: file, // Save the File object
      }));
    }
  };

  // Add a new product
  const handleAddProduct = async () => {
    if (
      newProduct.id &&
      newProduct.name &&
      newProduct.description &&
      newProduct.price &&
      newProduct.image
    ) {
      const formData = new FormData();
      formData.append("productId", newProduct.id);
      formData.append("productName", newProduct.name);
      formData.append("productDescription", newProduct.description);
      formData.append("productPrice", newProduct.price);
      formData.append("productImage", newProduct.image);

      // Log FormData entries for debugging
      console.log("FormData to be sent:", Array.from(formData.entries()));

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/products/create/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProducts((prev) => [...prev, response.data]);
        toast.success("Product added successfully!");

        // Reset the form fields
        setNewProduct({
          id: "",
          name: "",
          description: "",
          price: "",
          image: null,
        });
      } catch (error) {
        console.error(
          "Error adding product:",
          error.response?.data || error.message
        );
        toast.error(
          error.response?.data?.detail ||
            "Failed to add product. Check the input data."
        );
      }
    } else {
      toast.error("Please fill in all fields before adding a product.");
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* Sidebar */}
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
                  <a href="/" className="nav-link align-middle px-0">
                    <i className="fs-4 bi-house"></i>
                    <span className="ms-1 d-none d-sm-inline">Home</span>
                  </a>
                </li>
              </ul>
              <hr />
            </div>
          </div>

          {/* Main Content */}
          <div className="container mt-4">
            <h2>Product Table</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.productDescription}</td>
                    <td>{product.productPrice}</td>
                    <td>
  <img
    src={`http://127.0.0.1:8000/${product.productImage}`} // Removed the space
    alt={product.productName}
    width="50"
  />
</td>

                    <td>
                      <button className="btn btn-warning btn-sm me-2">
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add Product Form */}
            <h3>Add New Product</h3>
            <div className="mb-3">
              <input
                type="text"
                name="id"
                placeholder="ID"
                value={newProduct.id}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="form-control mb-2"
              />
              <button className="btn btn-primary" onClick={handleAddProduct}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


//for edit and delete product

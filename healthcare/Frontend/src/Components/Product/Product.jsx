// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Product.css"; // Assuming you save the CSS in Product.css

// export default function Product() {
//   const [products, setProducts] = useState([]);

//   // Fetch products on component mount
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/products/");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       toast.error("Failed to fetch products.");
//     }
//   };

//   const handleAddToCart = (product) => {
//     // Logic for adding the product to the cart
//     console.log("Product added to cart:", product);
//     toast.success(`${product.productName} added to cart!`);
//   };

//   return (
//     <div className="product-container">
//       <ToastContainer position="top-center" autoClose={2000} />
//       <h2 className="product-title">Products</h2>
//       <div className="product-row">
//         {products.map((product) => (
//           <div className="product-card" key={product.productId}>
//             <img
//               src={`http://127.0.0.1:8000/${product.productImage}`}
//               alt={product.productName}
//               className="product-image"
//             />
//             <h5 className="product-name">{product.productName}</h5>
//             <p className="product-details">{product.productDescription}</p>
//             <p className="product-price">৳{product.productPrice}</p>
//             <button
//               className="add-to-cart-btn"
//               onClick={() => handleAddToCart(product)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css"; // Assuming you save the CSS in Product.css

export default function Product() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      // Show toast if not logged in
      toast.error("Please log in to add products to the cart.");
      return;
    }

    // Logic for adding the product to the cart
    console.log("Product added to cart:", product);
    toast.success(`${product.productName} added to cart!`);
  };

  return (
    <div className="product-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 className="product-title">Products</h2>
      <div className="product-row">
        {products.map((product) => (
          <div className="product-card" key={product.productId}>
            <img
              src={`http://127.0.0.1:8000/${product.productImage}`}
              alt={product.productName}
              className="product-image"
            />
            <h5 className="product-name">{product.productName}</h5>
            <p className="product-details">{product.productDescription}</p>
            <p className="product-price">৳{product.productPrice}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
         
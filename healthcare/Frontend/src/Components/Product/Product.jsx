
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import "./Product.css"; // Assuming you save the CSS in Product.css

// // export default function Product() {
// //   const [products, setProducts] = useState([]);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

// //   // Check login status on component mount
// //   useEffect(() => {
// //     const token = localStorage.getItem("accessToken");
// //     setIsLoggedIn(!!token);
// //   }, []);

// //   // Fetch products on component mount
// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axios.get("http://127.0.0.1:8000/api/products/");
// //       setProducts(response.data);
// //     } catch (error) {
// //       console.error("Error fetching products:", error);
// //       toast.error("Failed to fetch products.");
// //     }
// //   };

// //   const handleAddToCart = (product) => {
// //     if (!isLoggedIn) {
// //       // Show toast if not logged in
// //       toast.error("Please log in to add products to the cart.");
// //       return;
// //     }

// //     // Logic for adding the product to the cart
// //     console.log("Product added to cart:", product);
// //     toast.success(`${product.productName} added to cart!`);
// //   };

// //   return (
// //     <div className="product-container">
// //       <ToastContainer position="top-center" autoClose={2000} />
// //       <h2 className="product-title">Products</h2>
// //       <div className="product-row">
// //         {products.map((product) => (
// //           <div className="product-card" key={product.productId}>
// //             <img
// //               src={`http://127.0.0.1:8000/${product.productImage}`}
// //               alt={product.productName}
// //               className="product-image"
// //             />
// //             <h5 className="product-name">{product.productName}</h5>
// //             <p className="product-details">{product.productDescription}</p>
// //             <p className="product-price">৳{product.productPrice}</p>
// //             <button
// //               className="add-to-cart-btn"
// //               onClick={() => handleAddToCart(product)}
// //             >
// //               Add to Cart
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
         


// // Trying new 

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Product.css"; // Assuming CSS is saved in Product.css

// export default function Product() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     setIsLoggedIn(!!token);
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
//     if (!isLoggedIn) {
//       toast.error("Please log in to add products to the cart.");
//       return;
//     }

//     const existingProduct = cart.find(
//       (item) => item.productId === product.productId
//     );
//     if (existingProduct) {
//       setCart(
//         cart.map((item) =>
//           item.productId === product.productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//     toast.success(`${product.productName} added to cart!`);
//   };

//   const handleRemoveFromCart = (productId) => {
//     setCart(cart.filter((item) => item.productId !== productId));
//   };

//   const updateQuantity = (productId, increment) => {
//     setCart(
//       cart.map((item) =>
//         item.productId === productId
//           ? { ...item, quantity: Math.max(1, item.quantity + increment) }
//           : item
//       )
//     );
//   };

//   const calculateTotalPrice = () => {
//     return cart
//       .reduce((total, item) => total + item.quantity * item.productPrice, 0)
//       .toFixed(2);
//   };

//   return (
//     <div className="product-container">
//       <ToastContainer position="top-center" autoClose={2000} />
//       <h2 className="product-title">Products</h2>

//       {/* Cart Icon */}
//       <div className="cart-icon" onClick={() => setShowCart(true)}>
//         🛒<span className="cart-count">{cart.length}</span>
//       </div>

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

//       {/* Cart Modal */}
//       {showCart && (
//         <div className="cart-modal">
//           <div className="cart-content">
//             <h2>Your Cart</h2>
//             {cart.length === 0 ? (
//               <p>Your cart is empty.</p>
//             ) : (
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Product</th>
//                     <th>Price</th>
//                     <th>Quantity</th>
//                     <th>Total</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cart.map((item) => (
//                     <tr key={item.productId}>
//                       <td>{item.productName}</td>
//                       <td>৳{item.productPrice}</td>
//                       <td>
//                         <button
//                           onClick={() => updateQuantity(item.productId, -1)}
//                         >
//                           -
//                         </button>
//                         {item.quantity}
//                         <button
//                           onClick={() => updateQuantity(item.productId, 1)}
//                         >
//                           +
//                         </button>
//                       </td>
//                       <td>৳{(item.quantity * item.productPrice).toFixed(2)}</td>
//                       <td>
//                         <button
//                           onClick={() => handleRemoveFromCart(item.productId)}
//                         >
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//             <h3>Total: ৳{calculateTotalPrice()}</h3>
//             <button className="place-order-btn">Place Order</button>
//             <button className="cancel-order-btn" onClick={() => setCart([])}>
//               Cancel Order
//             </button>
//             <button
//               className="close-cart-btn"
//               onClick={() => setShowCart(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
   



// // Latest Code 

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Product.css"; // Assuming CSS is saved in Product.css

// export default function Product() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

//   // Check login state on component mount and fetch products
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     setIsLoggedIn(!!token); // Set the login state based on token existence

//     // Load cart from localStorage if available
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);

//     fetchProducts();
//   }, []);

//   // Fetch products from API
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/products/");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       toast.error("Failed to fetch products.");
//     }
//   };

//   // Add product to cart
//   const handleAddToCart = (product) => {
//     if (!isLoggedIn) {
//       toast.error("Please log in to add products to the cart.");
//       return;
//     }

//     const existingProduct = cart.find(
//       (item) => item.productId === product.productId
//     );
//     if (existingProduct) {
//       setCart(
//         cart.map((item) =>
//           item.productId === product.productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }

//     // Save updated cart to localStorage
//     localStorage.setItem("cart", JSON.stringify(cart));
//     toast.success(`${product.productName} added to cart!`);
//   };

//   // Remove product from cart
//   const handleRemoveFromCart = (productId) => {
//     const updatedCart = cart.filter((item) => item.productId !== productId);
//     setCart(updatedCart);

//     // Save updated cart to localStorage
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   // Update quantity of product in the cart
//   const updateQuantity = (productId, increment) => {
//     const updatedCart = cart.map((item) =>
//       item.productId === productId
//         ? { ...item, quantity: Math.max(1, item.quantity + increment) }
//         : item
//     );
//     setCart(updatedCart);

//     // Save updated cart to localStorage
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   // Calculate total price of items in the cart
//   const calculateTotalPrice = () => {
//     return cart
//       .reduce((total, item) => total + item.quantity * item.productPrice, 0)
//       .toFixed(2);
//   };

//   return (
//     <div className="product-container">
//       <ToastContainer position="top-center" autoClose={2000} />
//       <h2 className="product-title">Products</h2>

//       {/* Cart Icon */}
//       <div className="cart-icon" onClick={() => setShowCart(true)}>
//         🛒<span className="cart-count">{cart.length}</span>
//       </div>

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

//       {/* Cart Modal */}
//       {showCart && (
//         <div className="cart-modal">
//           <div className="cart-content">
//             <h2>Your Cart</h2>
//             {cart.length === 0 ? (
//               <p>Your cart is empty.</p>
//             ) : (
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Product</th>
//                     <th>Price</th>
//                     <th>Quantity</th>
//                     <th>Total</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cart.map((item) => (
//                     <tr key={item.productId}>
//                       <td>{item.productName}</td>
//                       <td>৳{item.productPrice}</td>
//                       <td>
//                         <button
//                           onClick={() => updateQuantity(item.productId, -1)}
//                         >
//                           -
//                         </button>
//                         {item.quantity}
//                         <button
//                           onClick={() => updateQuantity(item.productId, 1)}
//                         >
//                           +
//                         </button>
//                       </td>
//                       <td>৳{(item.quantity * item.productPrice).toFixed(2)}</td>
//                       <td>
//                         <button
//                           onClick={() => handleRemoveFromCart(item.productId)}
//                         >
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//             <h3>Total: ৳{calculateTotalPrice()}</h3>
//             <button className="place-order-btn">Place Order</button>
//             <button className="cancel-order-btn" onClick={() => setCart([])}>
//               Cancel Order
//             </button>
//             <button
//               className="close-cart-btn"
//               onClick={() => setShowCart(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/cart/view/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setCart(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]); // Ensure cart is an empty array on failure
    }
  };

  const handleAddToCart = async (product) => {
    if (!localStorage.getItem("accessToken")) {
      toast.error("Please log in to add products to the cart.");
      return;
    }

    if (processing) return;
    setProcessing(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cart/add/",
        { productId: product.productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast.success(`${product.productName} added to cart!`);
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart.");
    } finally {
      setProcessing(false);
    }
  };

  const updateQuantity = async (cartId, increment) => {
    const cartItem = cart.find((item) => item.id === cartId);
    const newQuantity = Math.max(1, cartItem.quantity + increment);
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/cart/${cartId}/update/`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      toast.error("Failed to update product quantity.");
    }
  };

  const handleRemoveFromCart = async (cartId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cart/${cartId}/remove/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      toast.success("Product removed from cart.");
      fetchCart();
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Failed to remove product from cart.");
    }
  };

  const cancelOrder = () => {
    setCart([]);
    toast.info("Order canceled.");
  };

  const calculateTotalPrice = () =>
    cart
      .reduce((total, item) => total + item.quantity * item.productPrice, 0)
      .toFixed(2);

  return (
    <div className="product-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 className="product-title">Products</h2>

      {/* Cart Icon */}
      <div className="cart-icon" onClick={() => setShowCart(true)}>
        🛒
        <span className="cart-count">{cart.length}</span>
      </div>

      {/* Product List */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
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
                disabled={processing}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="cart-modal">
          <div className="cart-content">
            <h2>Your Cart</h2>
            <button
              className="close-cart-btn"
              onClick={() => setShowCart(false)}
            >
              X
            </button>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.productName}</td>
                      <td>৳{item.productPrice}</td>
                      <td>
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          -
                        </button>
                        {item.quantity}
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </button>
                      </td>
                      <td>৳{(item.quantity * item.productPrice).toFixed(2)}</td>
                      <td>
                        <button onClick={() => handleRemoveFromCart(item.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <h3>Total: ৳{calculateTotalPrice()}</h3>
            <button className="cancel-order-btn" onClick={cancelOrder}>
              Cancel Order
            </button>
            <button className="place-order-btn">Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
}

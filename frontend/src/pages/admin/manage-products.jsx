import React, { useState, useEffect } from "react";
import axios from "axios";

export const ManageProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [sellers, setSellers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/products/sellers"
        );
        setSellers(response.data.sellers);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/products/create",
        {
          name,
          price,
          stock,
          image,
          sellerId,
        }
      );
      setMessage(response.data.message);
      setName("");
      setPrice("");
      setStock("");
      setImage("");
      setSellerId("");
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product.");
    }
  };

  return (
    <div className="manage-product">
      <h1>Create Products</h1>
      <form onSubmit={handleAddProduct}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label>Assign Seller:</label>
          <select
            value={sellerId}
            onChange={(e) => setSellerId(e.target.value)}
            required
          >
            <option value="">Select a Seller</option>
            {sellers.map((seller) => (
              <option key={seller.id} value={seller.id}>
                {seller.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

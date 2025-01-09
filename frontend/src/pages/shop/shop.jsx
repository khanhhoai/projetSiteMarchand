import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
  return (
      <div className="product-container">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
  );
};

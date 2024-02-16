import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-4">Product Details</h2>
      {product ? (
        <div className="bg-white border border-gray-300 p-4 rounded">
          <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
          <div className="mb-4">
            <strong>Product Features:</strong>
            <p>{product.features}</p>
          </div>
          <div className="mb-4">
            <strong>Product Description:</strong>
            <p>{product.description}</p>
          </div>
          <div className="mb-4">
            <strong>Product Images:</strong>
            <div className="flex">
              {Array.isArray(product.images) ? (
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product ${index}`}
                    className="max-w-32 max-h-32 mr-4"
                  />
                ))
              ) : (
                <span>No images available</span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <strong>Product Category:</strong>
            <p>{product.category}</p>
          </div>
          <div className="mb-4">
            <strong>Product Sub-category:</strong>
            <p>{product.subcategory}</p>
          </div>
          <div className="mb-4">
            <strong>Product Brand:</strong>
            <p>{product.brand}</p>
          </div>
          <div className="mb-4">
            <strong>Product Publish Date:</strong>
            <p>{new Date(product.date).toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;

import React, { useState } from 'react';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    features: '',
    description: '',
    images: [],
    category: '',
    subcategory: '',
    brand: '',
    date: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch('http://localhost:5000/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      console.log('Product created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
          Product Name:
        </label>
        <input type="text" id="name" name="name" value={product.name}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 w-full rounded-md" required/>

        <label htmlFor="features" className="block mt-4 text-sm font-medium text-gray-600">
          Product Features:
        </label>
        <textarea id="features" name="features" value={product.features} onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 w-full rounded-md" required/>

        <label htmlFor="description" className="block mt-4 text-sm font-medium text-gray-600">
          Product Description:
        </label>
        <textarea id="description" name="description" value={product.description} onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 w-full rounded-md" required/>

        <label htmlFor="images" className="block mt-4 text-sm font-medium text-gray-600">
          Product Images (comma-separated URLs):
        </label>
        <input type="text" id="images" name="images"
          value={product.images.join(',')}
          onChange={(e) => setProduct({ ...product, images: e.target.value.split(',') })}
          className="mt-1 p-2 border border-gray-300 w-full rounded-md"
          required/>

        <label htmlFor="category" className="block mt-4 text-sm font-medium text-gray-600">
          Product Category:
        </label>
        <input type="text" id="category" name="category" value={product.category} onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 w-full rounded-md"
          required/>

        <label htmlFor="subcategory" className="block mt-4 text-sm font-medium text-gray-600">
          Product Sub-category:
        </label>
        <input type="text" id="subcategory" name="subcategory" value={product.subcategory}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 w-full rounded-md"
          required/>

        <label htmlFor="brand" className="block mt-4 text-sm font-medium text-gray-600">
          Product Brand:
        </label>
        <input type="text" id="brand" name="brand" value={product.brand}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 w-full rounded-md"
          required/>

        <label htmlFor="date" className="block mt-4 text-sm font-medium text-gray-600">
          Product Publish Date:
        </label>
        <input type="date" id="date" name="date" value={product.date} 
        onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 w-full rounded-md"
          required/>

        <button type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;



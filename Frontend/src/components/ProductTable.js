import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        images: [],
        category: '',
        subcategory: '',
        brand: '',
        date: '',
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await fetch(`http://localhost:5000/products/delete/${productId}`, {
                method: 'DELETE',
            });
            console.log('Product deleted successfully');
            fetchProducts(); 
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setEditFormData({
            name: product.name,
            images: product.images,
            category: product.category,
            subcategory: product.subcategory,
            brand: product.brand,
            date: product.date,
        });
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/products/update/${selectedProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editFormData),
            });

            if (response.ok) {
                console.log('Product updated successfully');
                fetchProducts();
                setSelectedProduct(null);
                setEditFormData({
                    name: '',
                    images: [],
                    category: '',
                    subcategory: '',
                    brand: '',
                    date: '',
                });
            } else {
                console.error('Error updating product');
            }
        } catch (error) {
            console.error(error);
        }
    };

    
    return (
        <div className="container mx-auto mt-8">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="p-4 text-left">Product Name</th>
                        <th className="p-4 text-left">Images</th>
                        <th className="p-4 text-left">Category</th>
                        <th className="p-4 text-left">Sub-category</th>
                        <th className="p-4 text-left">Brand</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product._id}>
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">
                                    {Array.isArray(product.images) ? (
                                        product.images.map((image, index) => (
                                            <img key={index} src={image} alt={`Product ${index}`} className="max-w-16 max-h-16"/>
                                        ))
                                    ) : (
                                        <span>No images available</span>
                                    )}
                                </td>
                                <td className="p-4">{product.category}</td>
                                <td className="p-4">{product.subcategory}</td>
                                <td className="p-4">{product.brand}</td>
                                <td className="p-4">
                                    <button onClick={() => handleEdit(product)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>

                                    <Link to={`/product/${product._id}`}>
                                        <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                                            View
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="p-4">No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>


            {selectedProduct && (
                <div className="mt-8 p-4 border border-gray-300">
                    <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
                    <form onSubmit={handleEditSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Product Name:</label>
                            <input type="text" name="name" value={editFormData.name}
                                onChange={handleEditChange}
                                className="mt-1 p-2 border border-gray-300 w-full"/>
                        </div>
                    
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Update Product
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductTable;









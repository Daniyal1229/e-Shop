import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getAllProducts();
    }, []);

    async function getAllProducts() {
        try {
            const response = await axios.get('http://localhost:5000/eShop/v1/api/products/');
            const productsData = response.data.products;
            setProducts(productsData);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            setLoading(false);
        }
    }

    const getProductDetails = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="products-container">
                {products.map((product) => (
                    <div key={product._id} className="product-card" onClick={() => getProductDetails(product)}>
                        <img className="product-image" src={product.image} alt={product.name} />
                        <div className="product-details">
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-description">{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                            ✕
                        </button>
                        <div className="modal-content">
                            <img className="modal-image" src={selectedProduct.image} alt={selectedProduct.name} />
                            <div className="modal-details">
                                <h2>{selectedProduct.name}</h2>
                                <p className="modal-description">{selectedProduct.description}</p>
                                <p className="modal-price">${selectedProduct.price}</p>
                                <div className="modal-buttons">
                                    <button className="add-to-cart">Add to Cart</button>
                                    <button className="buy-now">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;

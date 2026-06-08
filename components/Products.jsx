"use client";
import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Products({ categoryFilter }) { // Category filter accept karega
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(items);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter Logic: Search + Category dono
    const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
    });

    return (
        <section className="products-section">
            <div className="section-header">
                <h2>{categoryFilter || "Featured Artifacts"}</h2>
                <div className="divider"></div>
            </div>

            <div className="search-container">
                <i className="fa-solid fa-search search-icon"></i>
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search artifacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <p style={{ textAlign: 'center', color: '#d4af37' }}>Loading Masterpieces...</p>
            ) : (
                <div className="product-grid">
                    {/* Yahan filteredProducts.map use kiya hai, ab filter sahi kaam karega */}
                    {filteredProducts.map((product) => (
                        <div className="glass-product-card" key={product.id}>
                            <div 
                                className="product-img-wrapper" 
                                style={{ cursor: 'pointer', backgroundImage: `url(${product.img})`, backgroundSize: 'cover' }}
                                onClick={() => setSelectedProduct(product)}
                            />
                            <div className="product-info">
                                <span className="product-category">{product.category}</span>
                                <h3 className="product-title" onClick={() => setSelectedProduct(product)}>{product.name}</h3>
                                <div className="price-row">
                                    <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                                    <button className="add-cart-btn" onClick={() => addToCart(product)}>+ Add</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={`product-modal-overlay ${selectedProduct ? 'active' : ''}`} onClick={() => setSelectedProduct(null)}>
                {selectedProduct && (
                    <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setSelectedProduct(null)}>&times;</button>
                        
                        <div className="modal-left-img" style={{ backgroundImage: `url(${selectedProduct.img})` }}></div>
                        
                        <div className="modal-right-details">
                            <span className="product-category">{selectedProduct.category}</span>
                            <h2>{selectedProduct.name}</h2>
                            <div className="price">₹{selectedProduct.price.toLocaleString('en-IN')}</div>
                            
                            <p>This exquisite piece is a masterclass in glass artistry. Crafted with precision, it stands as a testament to the Akarsha Legacy, perfect for elevating any 5-star or royal environment.</p>
                            
                            <ul className="detail-list">
                                <li><i className="fa-solid fa-gem"></i> Premium {selectedProduct.category} Material</li>
                                <li><i className="fa-solid fa-fire-flame-simple"></i> High Thermal Endurance</li>
                                <li><i className="fa-solid fa-check-double"></i> 100% Quality Inspected</li>
                            </ul>

                            <button className="cta-btn submit-btn" style={{ background: '#d4af37', color: '#000' }} onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                                Add to Cart Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

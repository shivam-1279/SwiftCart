import { useEffect, useState } from 'react';
import ProductpagePlaceholder from './ProductpagePlaceholder';
import RelatedProducts from './RelatedProducts';
import { useParams } from 'react-router-dom';
import { getImageUrl, PLACEHOLDER_IMAGE } from "../../api";
import api from '../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Productpage = ({ setNumberCartItems, fetchCartStats }) => {
    const { slug } = useParams();
    const [product, setProduct] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inCart, setIncart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const cart_code = localStorage.getItem("cart_code");

    // Check if product is in cart
    useEffect(() => {
        if (product.id && cart_code) {
            api.get(`product_in_cart/?cart_code=${cart_code}&product_id=${product.id}`)
                .then(res => {
                    setIncart(res.data.product_in_cart);
                })
                .catch(err => {
                    console.log("Error checking cart:", err.message);
                });
        }
    }, [cart_code, product.id]);

    function add_item() {
        if (!cart_code) {
            toast.error("Cart not initialized. Please refresh the page.");
            return;
        }

        const newItem = { 
            cart_code: cart_code, 
            product_id: product.id,
            quantity: quantity
        };
        
        api.post("add_item/", newItem)
            .then(res => {
                toast.success("Item added to cart!");
                setIncart(true);
                if (fetchCartStats) {
                    fetchCartStats();
                } else if (setNumberCartItems) {
                    setNumberCartItems(prev => prev + quantity);
                }
            })
            .catch(err => {
                console.log("Error adding item:", err.message);
                toast.error("Error adding item to cart");
            });
    }

    useEffect(() => {
        if (!slug) return;
        
        setLoading(true);
        api.get(`product_detail/${slug}/`)
            .then(res => {
                console.log('Product data:', res.data);
                console.log('Product image URL:', res.data.image);
                console.log('Processed image URL:', getImageUrl(res.data.image));
                setProduct(res.data);
                setSimilarProducts(res.data.similar_products || []);
                setLoading(false);
            })
            .catch(err => {
                console.log("Error fetching product:", err.message);
                setLoading(false);
            });
    }, [slug]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) setQuantity(value);
    };

    if (loading) return <ProductpagePlaceholder />;

    if (!product.id && !loading) return <div className="container text-center py-5">Product not found</div>;

    return (
        <div>
            <section className='py-3'>
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img
                                className="card-img-top mb-5 mb-md-0 rounded"
                                src={getImageUrl(product.image)}
                                alt={product.name}
                                onError={(e) => { 
                                    console.log('Image failed to load, using placeholder');
                                    e.target.src = PLACEHOLDER_IMAGE;
                                }}
                                style={{ 
                                    maxHeight: '500px', 
                                    objectFit: 'contain', 
                                    width: '100%',
                                    backgroundColor: '#f8f9fa'
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1">SKU: {product.slug}</div>
                            <h1 className="display-5 fw-bolder">{product.name}</h1>
                            <div className="fs-5 mb-5">
                                <span>${product.price}</span>
                            </div>
                            <p className="lead">{product.description}</p>
                            <div className="d-flex align-items-center mb-3">
                                <input
                                    type="number"
                                    className="form-control me-3"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    style={{ width: '80px' }}
                                    min="1"
                                />
                                <button
                                    className="btn btn-outline-dark flex-shrink-0"
                                    type='button'   
                                    onClick={add_item}
                                    disabled={inCart || !cart_code}
                                >
                                    <i className="bi-cart-fill me-1"></i>
                                    {inCart ? "Product in cart" : "Add to Cart"}
                                </button>
                            </div>
                            {!cart_code && (
                                <div className="text-danger mt-2 small">
                                    Cart not initialized. Please refresh the page.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {similarProducts.length > 0 && <RelatedProducts products={similarProducts} />}
        </div>
    );
};

export default Productpage;
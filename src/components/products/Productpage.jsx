import { useEffect, useState } from 'react';
import ProductpagePlaceholder from './ProductpagePlaceholder';
import RelatedProducts from './RelatedProducts';
import { useParams } from 'react-router-dom';
import { getImageUrl, PLACEHOLDER_IMAGE } from "../../api";
import api from '../../api';
import { toast } from 'react-toastify';

const Productpage = ({ setNumberCartItems, fetchCartStats }) => {
    const { slug } = useParams();
    const [product, setProduct] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inCart, setIncart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [currentImage, setCurrentImage] = useState(PLACEHOLDER_IMAGE);

    const cart_code = localStorage.getItem("cart_code");

    // Check if product is in cart (ignore errors)
    useEffect(() => {
        if (product.id && cart_code) {
            api.get(`product_in_cart/?cart_code=${cart_code}&product_id=${product.id}`)
                .then(res => {
                    setIncart(res.data.product_in_cart);
                })
                .catch(err => {
                    // Ignore cart errors for now
                });
        }
    }, [cart_code, product.id]);

    function add_item() {
        if (!cart_code) {
            toast.error("Please refresh the page to initialize cart");
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
            })
            .catch(err => {
                toast.error("Error adding item to cart");
            });
    }

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        api.get(`product_detail/${slug}/`)
            .then(res => {
                console.log('✅ Product data:', res.data);
                setProduct(res.data);
                setSimilarProducts(res.data.similar_products || []);

                // Set image URL immediately
                if (res.data.image) {
                    const imageUrl = getImageUrl(res.data.image);
                    console.log('🖼️ Setting image URL:', imageUrl);
                    setCurrentImage(imageUrl);
                }

                setLoading(false);
            })
            .catch(err => {
                console.log("Error fetching product:", err);
                setLoading(false);
            });
    }, [slug]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) setQuantity(value);
    };

    const handleImageError = (e) => {
        console.log('❌ Image failed to load, using placeholder');
        setCurrentImage(PLACEHOLDER_IMAGE);
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
                                    {inCart ? "In Cart" : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {similarProducts.length > 0 && <RelatedProducts products={similarProducts} />}
        </div>
    );
};

export default Productpage;
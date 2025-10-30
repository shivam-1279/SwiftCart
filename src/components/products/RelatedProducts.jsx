import React from 'react'
import ProductCard from '../home/ProductCard'

const RelatedProducts = ({ products }) => {
    // Add safety check for empty products
    if (!products || products.length === 0) {
        return null // or return a message
    }

    return (
        <div>
            <section className="py-3 bg-light">
                <div className="container px-4 px-lg-5 mt-3"> {/* Fixed: conatiner to container */}
                    <h2 className="fw-bolder mb-4">Related Products</h2>
                    <div className="row gx-4 gx-lg-4 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"> {/* Fixed: justify-center to justify-content-center */}
                        {products.map(product => 
                            <ProductCard key={product.id} product={product} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RelatedProducts
import React from 'react';
import ProductCard from './ProductCard';

function CardContainer({ products }) {
  return (
    <section className="py-5" id="shop">
      <h4 className="text-center mb-4">Our Products</h4>
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row justify-content-center">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardContainer;

import React from 'react';

const ProductpagePlaceholder = () => {
  return (
    <section className="py-3">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          
          {/* Image Placeholder */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div 
              className="placeholder-glow" 
              style={{
                height: '400px',
                backgroundColor: '#e0e0e0',
                borderRadius: '8px'
              }}
            ></div>
          </div>

          {/* Text Placeholder */}
          <div className="col-md-6">
            <div className="placeholder-glow">
              <p className="placeholder col-4 mb-2"></p>
              <h1 className="placeholder col-8 mb-3"></h1>
              <p className="placeholder col-3 mb-3"></p>
              <p className="placeholder col-10 mb-4"></p>
              <p className="placeholder col-9 mb-4"></p>

              <div className="d-flex">
                <div className="placeholder col-1 me-3" style={{ height: "38px" }}></div>
                <div className="placeholder col-3" style={{ height: "38px" }}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductpagePlaceholder;

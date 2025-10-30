import React from 'react';

const PlaceholderCard = () => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0" aria-hidden="true">
        {/* Placeholder Image */}
        <div
          className="card-img-top"
          style={{
            height: "220px",
            backgroundColor: "#e0e0e0",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          }}
        ></div>

        <div className="card-body d-flex flex-column">
          {/* Placeholder Title */}
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>

          {/* Placeholder Price */}
          <p className="card-text placeholder-glow mb-2">
            <span className="placeholder col-6"></span>
          </p>

          {/* Placeholder Button */}
          <div className="mt-auto">
            <span
              className="placeholder col-12"
              style={{ height: "36px", borderRadius: "50px", display: "inline-block" }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderCard;

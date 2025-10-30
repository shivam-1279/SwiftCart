import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center my-5">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/" className="btn btn-primary rounded-pill">Go Home</Link>
    </div>
  );
}

export default NotFound;

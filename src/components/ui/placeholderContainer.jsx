import React from 'react'
import Placeholder from './placeholder';
const placeholderContainer = () => {
    const PlaceNumber =[...Array(12).keys()].slice(0);
  return (
        <section className="py-5" id="shop">
      <h4 className="text-center mb-4">Our Products</h4>
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row justify-content-center">
               { PlaceNumber.map(num =><Placeholder key={num}/>)}
        </div>
      </div>
    </section>

  )
}

export default placeholderContainer
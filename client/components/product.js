import React from 'react'

export default function Product(props) {
  const product = props.product
  return (
    <div className="container">
      <div className="col s12 l6">
        <div className="card">
          <div className="card-image">
            <img
              className="responsive-img"
              height="350"
              src={product.imageUrl}
            />
          </div>
          <div className="card-content">
            <i className="material-icons pink-text pulse right">favorite</i>
            <span className="card-title">{product.name}</span>
            <p>{product.description}</p>
            <span className="card-title">Card Title</span>
            <p>I am a very simple card. I am good at containing.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

//  <div className="listed-product-text">
// <p className="listed-product-name">{product.name}</p>
// <p className="listed-product-price">{product.price}</p>

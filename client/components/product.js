import React from 'react'

export default function Product(props) {
  const product = props.product
  return (
    <div className="container">
      <main className="allProduct">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-image">
                <img src={product.imageUrl} />
              </div>
              <div className="card-content">
                <span className="card-title">Card Title</span>
                <p>I am a very simple card. I am good at containing.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

//  <div className="listed-product-text">
// <p className="listed-product-name">{product.name}</p>
// <p className="listed-product-price">{product.price}</p>

import React from 'react'

export default (Product = props => {
  const product = props.product
  return (
    <div className="container">
      <div className="col s12 l6">
        <div className="card hoverable horizontal small">
          <div className="card-image">
            <img className="responsive-img" src={product.imageUrl} />
          </div>
          <div className="card-content">
            <i className="material-icons pink-text pulse small right">
              favorite
            </i>
            <span className="card-title">
              <strong>{product.name}</strong>
            </span>
            <p className="product-description">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
})

import React from 'react'

export default function Product(props) {
  const product = props.product
  return (
    <div className="container">
      <div className="col s12 l6">
        <div className="card">
          <div className="card-image">
            <img className="responsive-img" src={product.imageUrl} />
          </div>
          <div className="card-content">
            <i className="material-icons pink-text pulse small right">
              favorite
            </i>
            <span className="card-title">{product.name}</span>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

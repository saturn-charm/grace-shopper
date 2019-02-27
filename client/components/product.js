import React from 'react'

export default function Product(props) {
  const product = props.product

  return (
    <div className="listed-product">
      <img className="listed-product-image" src={product.imageUrl} />
      <div className="listed-product-text">
        <p className="listed-product-name">{product.name}</p>
        <p className="listed-product-price">{product.price}</p>
      </div>
    </div>
  )
}

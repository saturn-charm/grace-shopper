import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => (
  <div className="container">
    <h4 className="center">WE'VE GOT YOUR DOG'S PAWS COVERED </h4>
    <div>
      <img
        src="https://www.canadapooch.com/content/products/23/canada-pooch-wellies-dog-boot-red-lined-side-view-1-color_67.jpg"
        className="responsive-img"
        height="280"
        width="500"
      />
      <p className="rootText">
        Welcome to the shop for your pups paws! Whatever the weather, we can
        outfit your pup with the coolest, warmest, highest, lowest, shiniest
        booties available. Check out our stock and upgrade your pups mittens
        with the click of a button!
      </p>
    </div>
    <Link to="/products">
      <p className="center-align">
        <button type="button" className="waves-effect teal lighten-2 btn-large">
          <i className="material-icons"> shopping_basket SHOP NOW </i>
        </button>
      </p>
    </Link>
  </div>
)

export default Home

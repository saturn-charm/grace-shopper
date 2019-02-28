import React from 'react'
import {Link} from 'react-router-dom'

const AboutUs = () => (
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
        Spicy jalapeno bacon ipsum dolor amet filet mignon velit swine veniam
        jerky ex beef dolore kevin, exercitation tongue sirloin. Venison
        landjaeger ex salami turducken brisket prosciutto biltong strip steak
        buffalo laboris shankle pig minim ball tip. Drumstick meatball salami,
        strip steak dolore ut mollit tempor kevin dolore laborum non tail corned
        beef. Pastrami tail tri-tip, officia turducken excepteur rump pancetta
        anim. Spicy jalapeno bacon ipsum dolor amet filet mignon velit swine
        veniam jerky ex beef dolore kevin, exercitation tongue sirloin. Venison
        landjaeger. Ex salami turducken brisket prosciutto biltong strip steak
        buffalo laboris shankle pig minim ball tip. Drumstick meatball salami,
        strip steak dolore ut mollit tempor kevin dolore laborum non tail corned
        beef. Pastrami tail tri-tip, officia turducken excepteur rump pancetta
        anim. Spicy jalapeno bacon ipsum dolor amet filet mignon velit swine
        veniam jerky ex beef dolore kevin, exercitation tongue sirloin. Venison
        landjaeger ex salami turducken brisket prosciutto biltong strip steak
        buffalo laboris shankle pig minim ball tip. Drumstick meatball salami,
        strip steak dolore ut mollit tempor kevin dolore laborum non tail corned
        beef. Pastrami tail tri-tip, officia turducken excepteur rump pancetta
        anim. Spicy jalapeno bacon ipsum dolor amet filet mignon velit swine
        veniam jerky ex beef dolore kevin, exercitation tongue sirloin. Venison
        landjaeger.
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

export default AboutUs

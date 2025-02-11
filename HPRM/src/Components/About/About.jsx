import React, { Fragment } from 'react';
import image1 from "../Assets/3.jpg";
import "./about.css";

const About = () => {
  return (
    <Fragment>
      <center><h1 className='heading'>About Us</h1></center>
      
      <div className='aboutcontainer'>
        <div className='aboutbox'>
          
          <div className='left'>
            <img className='aboutimg' src={image1} alt="Resort View" />
          </div>

          <div className='right'>
            <h2 className='tagline'>Experience the serenity of nature, tailored to perfection.</h2>
            
            <h3>About Us</h3>
            <p>At Hills Property and Resort Management, we specialize in crafting unforgettable experiences amidst nature's splendor. Our team of experts ensures seamless management, tailored to meet the unique needs of each property and resort.</p>
            
            <h3>Services</h3>
            <ul>
              <li><strong>Property Management:</strong> Expert care for your hillside property, ensuring maximum returns on investment.</li>
              <li><strong>Resort Management:</strong> Personalized services to elevate the guest experience, driving loyalty and revenue growth.</li>
              <li><strong>Hospitality Services:</strong> Customized solutions for events, weddings, and conferences, set amidst breathtaking natural beauty.</li>
            </ul>

            <h3>Amenities</h3>
            <ul>
              <li><strong>Luxurious Accommodations:</strong> Spacious rooms, suites, and villas, blending comfort with scenic views.</li>
              <li><strong>Fine Dining:</strong> Savor local and international cuisine, crafted by our expert chefs.</li>
              <li><strong>Recreational Activities:</strong> Explore nature trails, indulge in water sports, or rejuvenate at our spa and wellness centers.</li>
            </ul>
          </div>
          
        </div>
      </div>
    </Fragment>
  );
};

export default About;

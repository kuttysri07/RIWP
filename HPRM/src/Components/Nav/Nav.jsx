import React, { Fragment, useState } from 'react'
import "./nav.css"
import hamburger from "../Assets/icons8-hamburger-menu-100.png"
import { Link as ScrollLink } from "react-scroll";
 

const Nav = () => {

  const [menu , setMenu] = useState(false);

  const menutoggle = () =>{
      setMenu(!menu);
  }

  return (
    <Fragment>
        <nav className='navcontainer'>
          <img className='hamburger' src={hamburger} alt=""  onClick={menutoggle}/>
            <h1 className='text-xl font-bold'>R Connect </h1>
            <ul className={menu ? 'reset': 'navcontent'}>
            <li>
            <ScrollLink
              to="homecontainer"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              activeClass="txtcolor"
            >
              Home
            </ScrollLink>
          
        </li>
        <li>
            <ScrollLink
              to="findcontainer"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="txtcolor"
            >
              FindYourMatch
            </ScrollLink>
          
        </li>
        <li>
            <ScrollLink
              to="aboutcontainer"
              spy={true}
              smooth={true}
              offset={-40}
              duration={500}
              activeClass="txtcolor"
            >
              About Us
            </ScrollLink>
          
        </li>
        <li>
            <ScrollLink
              to="enquiry-container"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
              activeClass="txtcolor"
            >
              Enquiry
            </ScrollLink>
          
        </li>
        <li>
            <ScrollLink
              to="contact-container"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              activeClass="txtcolor"
            >
              Contact
            </ScrollLink>
          
        </li>
             
            </ul>
        </nav>
    </Fragment>

   
  )
}

export default Nav
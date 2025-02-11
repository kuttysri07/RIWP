import React, { Fragment } from 'react'
import "./find.css"
import { Link } from 'react-router-dom'

const Findyourmatch = () => {
  return (
    <Fragment>
        <center><h1 className='heading'>Your Resort Land Awaits!</h1></center>
        <div className='findcontainer'>
            <div className='findbox'>
            <Link to={"/newhouses"} style={{textDecoration:"none"}}> <div className='findbtn' >Buyer</div></Link>   
            <Link to={"/properties"} style={{textDecoration:"none"}}> <div className='findbtn' >Seller</div></Link>  
            </div>
        </div>
      
    </Fragment>
    
  )
}

export default Findyourmatch
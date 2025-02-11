import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import "./buyerpage.css"; // Import your CSS file
import Nav2 from '../Nav2/Nav2';
import { Link, useSearchParams } from 'react-router-dom';
import Search from '../Search/Search';
import { Button, Result } from 'antd';

const url = import.meta.env.VITE_REACT_APP_URL;

const Buyerpage = () => {
    const [buyerdata, setBuyerData] = useState([]);
    const [searchparams] = useSearchParams();
    const [err, setErr] = useState(null); // To store error messages
    const [loading, setLoading] = useState(true); 
   

    

    useEffect(() => {
      const getbuyerdata = () => {
        axios.get(`${url}getnewhouses?` + searchparams.toString())
            .then(res => {
                if (res.data.length === 0) {
                  setErr("No user found"); // Set the message if no users are found
                  setLoading(false); // Set loading false once data is fetched
                } else {
                  setErr(null); // Clear error if data is found
                  setBuyerData(res.data);
                  setLoading(false); // Set loading false once data is fetched
                  console.log(res.data);
                }
               
            })
            .catch(err =>  { 
              console.log(`error from new houses ${err}`);
              setLoading(false); // Set loading false once data is fetche
              setErr("Server Error"); // Set the message if no users are found
            } );           
    };
        getbuyerdata();
       
    }, [searchparams]);

  

    if (loading) {
      return <div className='loader'></div>; // Show loading indicator while data is being fetched
    }


    return (
        <Fragment>

            <Nav2 />

            <h1 className="buyer-title">New Houses</h1>
              <Search />

            {err ? (
        <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong." 
        extra={<Button  type="primary" href='/'>Back Home</Button>}
      />
        

      ):(
        <div className="buyer-container">

{buyerdata.map((data) => (
  <div className="buyer-card" key={data._id}>
    <div className="image-container">
   
    <center>
        <img className="img" src={data.uploadimage[0]} alt="" />
    </center>
   
</div>

     
      
                      <table className="details-table">  
                        <tbody>  
                          <tr>
                            <th>Project Name</th>
                            <td>{data.projectName}</td>
                          </tr>
                          <tr>
                            <th>Title</th>
                            <td>{data.title}</td>
                          </tr>
                          <tr>
                            <th>Sale Type</th>
                            <td>{data.saleType}</td>
                          </tr>
                          <tr>
                            <th>Society</th>
                            <td>{data.society}</td>
                          </tr>
                          </tbody>
                          </table>

                        <Link to={`newhouse/${data._id}` }>  <button className='more'>
                             More
                          </button></Link>
                         

                    </div>
                  ))}

                
            </div>
      )}

              
        </Fragment>
    );
}

export default Buyerpage;

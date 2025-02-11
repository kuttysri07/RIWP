import React, { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import Nav2 from '../Nav2/Nav2';
import Search from '../Search/Search';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Result } from 'antd';

const url = import.meta.env.VITE_REACT_APP_URL;

const BuyerPage = () => {
    const [propertydata, setPropertyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchparams] = useSearchParams();
    const [err, setErr] = useState(null); // To store error messages 
 

    const getPropertyData = () => {
        axios.get(`${url}getnewhouses?` + searchparams.toString())
            .then(res => {
                if (res.data.length === 0) {
                    setErr("No user found"); // Set the message if no users are found
                    setLoading(false); // Set loading false once data is fetched
                } else {
                    setErr(null); // Clear error if data is found
                    setPropertyData(res.data);
                    setLoading(false); // Set loading false once data is fetched
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Set loading false once data is fetched
                setErr("Server Error");
            });
    }

    useEffect(() => {
        getPropertyData();
    }, [searchparams]);

 


 

 

    if (loading) {
        return <div className='loader'></div>; // Show loading indicator while data is being fetched
    }

    return (
        <Fragment>
            <Nav2 />
            <h1 className="buyer-title">Buyer</h1>
            <Search />

            {err ? (
                       <Result
                       status="500"
                       title="500"
                       subTitle="Sorry, something went wrong. " 
                       extra={<Button  type="primary" href='/'>Back Home</Button>}
                     />
            ) : (
                <div className="buyer-container">
                    {propertydata.map((data, index) => {
                       
                        return (
                            <div className="buyer-card" key={index}>

                                <table className="details-table">
                                    <tbody>
                                        <tr>
                                            <th>State</th>
                                            <td>{data.state}</td>
                                        </tr>
                                        <tr>
                                            <th>District</th>
                                            <td>{data.district}</td>
                                        </tr>
                                    </tbody>
                                </table>

                              <Link to={`buyer/${data._id}`}> <button className='more'>More</button> </Link> 

                            </div>
                        );
                    })}
                </div>
            )}
        </Fragment>
    )
}

export default BuyerPage;

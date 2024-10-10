import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav2 from '../Nav2/Nav2';
import "./property.css"
const url = process.env.REACT_APP_API_URL;


const Property = () => {
    const [details, setDetails] = useState(null);
    const [count, setCount] = useState(0);
    const [err, setErr] = useState(null);
    const { id } = useParams();

    const getsingleProperty = async () => {
        try {
            const res = await axios.get(`${url}getsingleproperty/${id}`);
            setDetails(res.data);
        } catch (error) {
            setErr("Single product fetching Error: " + error.message);
        }
    };

    useEffect(() => {
        if (id) {
            getsingleProperty();
        }
    }, [id]);

    const handleLeftArrowClick = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleRightArrowClick = () => {
        if (count < details.uploadimage.length - 1) {
            setCount(count + 1);
        }
    };

    if (!details) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div>
            <Fragment>
                <Nav2 />

                {err ? (
                    <div style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
                        <h2>{err}</h2>
                    </div>
                ) : (
                    <div className="property-container">
                        <div className="property-card">
                            <div className="image-slider">
                                <button className="arrow-btn left-btn" onClick={handleLeftArrowClick}>
                                    &lt;
                                </button>
                                <center>
                                    <img className="product-image" src={details.uploadimage[count]} alt="" />
                                </center>
                                <button className="arrow-btn right-btn" onClick={handleRightArrowClick}>
                                    &gt;
                                </button>
                            </div>

                            <div className="property-info">
                                <h2 className="property-title">{details.propertyName}</h2>
                                <p className="project-name">{details.companyName}</p>
                                <p className="property-description">{details.propertyDetails}</p>

                                <div className="property-features">
                                    <h3>Property Information</h3>
                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <strong>State:</strong> {details.state}
                                        </div>
                                        <div className="detail-item">
                                            <strong>District:</strong> {details.district}
                                        </div>
                                        <div className="detail-item">
                                            <strong>Type:</strong> {details.propertytype}
                                        </div>
                                        <div className="detail-item">
                                            <strong>Amenities:</strong> {details.amenities}
                                        </div>
                                        <div className="detail-item">
                                            <strong>Features:</strong> {details.features}
                                        </div>
                                        <div className="detail-item">
                                            <strong>No. of Plots:</strong> {details.noOfPlots}
                                        </div>
                                        <div className="detail-item">
                                            <strong>Plot Size (Min):</strong> {details.plotSizeMin} sq.ft
                                        </div>
                                        <div className="detail-item">
                                            <strong>Plot Size (Max):</strong> {details.plotSizeMax} sq.ft
                                        </div>
                                        <div className="detail-item">
                                            <strong>Location:</strong> {details.location}
                                        </div>
                                        <div className="detail-item">
                                            <strong>Nearby Spots:</strong> {details.nearbySpots}
                                        </div>
                                        <div className="detail-item">
                                            <strong>Status Approval:</strong> 
                                            {details.status.dtcp && details.status.rera ? "DTCP AND RERA " : 
                                            details.status.dtcp ? "DTCP" : details.status.rera ? "RERA Facing" : ""}
                                        </div>
                                    </div>

                                    <h3>Plot Availability</h3>
                                    <div className="plot-grid">
                                        {Object.keys(details.plot).map((plotKey) => (
                                            <div key={plotKey} className="plot-item">
                                                {plotKey}: <input type="checkbox" checked={details.plot[plotKey]} readOnly />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Fragment>
        </div>
    );
};

export default Property;

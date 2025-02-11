import React, { Fragment, useEffect, useState } from "react";
import "./product.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav2 from "../Nav2/Nav2";
import { Image } from "antd";


const url = import.meta.env.VITE_REACT_APP_URL;

const Product = () => {
  const [details, setDetails] = useState(null);
  const [count, setCount] = useState(0);
  const [err, setErr] = useState(null);
  const { id } = useParams();

  const getsingleHouse = async () => {
    try {
      const res = await axios.get(`${url}getsinglehouse/${id}`);
      setDetails(res.data);
    } catch (error) {
      setErr("Single product fetching Error: " + error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getsingleHouse();
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
    <Fragment>
      <Nav2 />

      <div className="product-container">
        {err ? (
          <div className="error-message">
            <h2>{err}</h2>
          </div>
        ) : (
          <div className="product-card" key={details._id}>
            <div className="image-slider">
              <button
                className="arrow-btn left-btn"
                onClick={handleLeftArrowClick}
              >
                &lt;
              </button>
              {/* <img className="product-image" src={details.uploadimage[count]} alt={details.title} /> */}
              <div className="product-image-wrapper">
                <Image
                  src={details.uploadimage[count]}
                  alt={details.title}
                 
                />
              </div>

              <button
                className="arrow-btn right-btn"
                onClick={handleRightArrowClick}
              >
                &gt;
              </button>
            </div>
            <div className="product-info">
              <h1 className="product-title">{details.title}</h1>
              <h3 className="project-name">{details.projectName}</h3>
              <p className="product-description">{details.description}</p>
              <div className="details-grid">
                <div className="detail-item">
                  <strong>Sale Type:</strong> {details.saleType}
                </div>
                <div className="detail-item">
                  <strong>Society:</strong> {details.society}
                </div>
                <div className="detail-item">
                  <strong>Approved Status:</strong>{" "}
                  {details.status.rera && details.status.dtcp
                    ? "DTCP AND RERA"
                    : details.status.dtcp
                    ? "DTCP"
                    : details.status.rera
                    ? "RERA"
                    : "NO DTCP AND RERA"}
                </div>
                <div className="detail-item">
                  <strong>Construction Status:</strong>{" "}
                  {details.constructionStatus}
                </div>
                <div className="detail-item">
                  <strong>House Type:</strong> {details.houseType}
                </div>
                <div className="detail-item">
                  <strong>Budget:</strong> {details.budget}
                </div>
                <div className="detail-item">
                  <strong>Build Up Area:</strong> {details.buildUpArea}
                </div>
                <div className="detail-item">
                  <strong>Carpet Area:</strong> {details.carpetArea}
                </div>
                <div className="detail-item">
                  <strong>Total Floors:</strong> {details.totalFloors}
                </div>
                <div className="detail-item">
                  <strong>Bedrooms:</strong> {details.bedrooms}
                </div>
                <div className="detail-item">
                  <strong>Bathrooms:</strong> {details.bathrooms}
                </div>
                <div className="detail-item">
                  <strong>Balcony:</strong> {details.balcony}
                </div>
                <div className="detail-item">
                  <strong>Furnishing:</strong> {details.furnishing}
                </div>
                <div className="detail-item">
                  <strong>Car Parking:</strong> {details.carParking}
                </div>
                <div className="detail-item">
                  <strong>Facing:</strong> {details.facing}
                </div>
                <div className="detail-item">
                  <strong>Approved:</strong> {details.approve ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Product;

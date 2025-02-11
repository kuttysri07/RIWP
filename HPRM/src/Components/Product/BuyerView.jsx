import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav2 from "../Nav2/Nav2";

const url = import.meta.env.VITE_REACT_APP_URL;

const BuyerView = () => {
  const [details, setDetails] = useState(null);
  const [count, setCount] = useState(0);
  const [err, setErr] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getsingleProperty = async () => {
        try {
          const res = await axios.get(`${url}getsinglehouse/${id}`);
          setDetails(res.data);
        } catch (error) {
          setErr("Error fetching property details: " + error.message);
        }
      };
      getsingleProperty();
    }
  }, [id]);

  const handleLeftArrowClick = () => setCount((prev) => Math.max(prev - 1, 0));
  const handleRightArrowClick = () => {
    if (details?.uploadimage?.length > 0) {
      setCount((prev) => Math.min(prev + 1, details.uploadimage.length - 1));
    }
  };

  const renderCheckedItems = (obj) => {
    return obj
      ? Object.entries(obj)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(", ")
      : "N/A";
  };

  if (err) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg font-semibold">
        {err}
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <Nav2 />
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8 mt-10">
        {/* Image Slider */}
        {details.uploadimage?.length > 0 && (
          <div className="relative w-full h-96 flex items-center justify-center">
            <button
              className="absolute left-4 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition"
              onClick={handleLeftArrowClick}
            >
              &#10094;
            </button>
            <img
              className="w-full h-full object-cover rounded-md shadow-md"
              src={details.uploadimage[count] || "fallback-image.jpg"}
              alt={details.propertyName || "Property"}
            />
            <button
              className="absolute right-4 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition"
              onClick={handleRightArrowClick}
            >
              &#10095;
            </button>
          </div>
        )}

        {/* General Details */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900">Buyer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-gray-700">
                <strong>Buyer ID:</strong> {details.propertyId || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>State:</strong> {details.state || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>District:</strong> {details.district || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Place:</strong> {details.place || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>About Buyer:</strong> {details.aboutCompany || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Mobile Number:</strong> {details.number || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Property Details
              </h3>
              <p className="text-gray-700">
                <strong>Plot Size:</strong>{" "}
                {details.plotSizeMin && details.plotSizeMax
                  ? `${details.plotSizeMin} - ${details.plotSizeMax} Cent`
                  : "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Plot Price:</strong> {details.plotPrice || "N/A"}
              </p>

              <p className="text-gray-700">
                <strong>Required For</strong>
                {renderCheckedItems(details.usedFor)}
              </p>
              <div>
                <p className="text-gray-700">
                  <strong>Property Type</strong>
                  {renderCheckedItems(details.propertytype)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900">Go With</h3>

          <p className="text-gray-700">
            <strong>Property Management Company:</strong>{" "}
            {details.gowith.propertyManagementCompany ? "Yes" : "No"}
          </p>
          <p className="text-gray-700">
            <strong>Brokers / Agents:</strong> {details.gowith.brokers? "Yes" : "No"}
          </p>
          
        </div>

        {/* Support Features */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Required Supports </h3>
          <ul className="list-disc list-inside text-gray-700">
            {details.support
              ? Object.entries(details.support)
                  .filter(([_, value]) => value)
                  .map(([key]) => (
                    <li key={key}>{key.replace(/([A-Z])/g, " $1")}</li>
                  ))
              : "N/A"}
          </ul>
        </div>

        {/* Location & Nearby Spots */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Property Location</h3>
          <p className="text-gray-700">
            <strong>Coimbatore Nearby Spots:</strong>{" "}
            {renderCheckedItems(details.nearbySpots)}
          </p>
          <p className="text-gray-700">
            <strong>Other Region:</strong>{" "}
            {renderCheckedItems(details.otherRegion)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyerView;

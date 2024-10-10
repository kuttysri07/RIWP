import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
const APIURL = process.env.REACT_APP_API_URL;

const Sellercontrol = () => {
  const [userdata, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  const handleFetch = () => {
    axios
      .get(`${APIURL}getpropertyrequest`)
      .then((res) => {
        console.log(res.data);
       
        setUserData(res.data);
        setLoading(false); // Set loading false once data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        console.log(APIURL);
      });
  };

  // Handle approval of user data
  const approveHandler = (id, currentApproveStatus) => {
    // Toggle the approve status
    const newApproveStatus = !currentApproveStatus;

    // Update the user approval status in the backend
    axios
      .put(`${APIURL}updateproperty/${id}`, { approve: newApproveStatus })
      .then((res) => {
        console.log(res.data);

        // Update the state to reflect the change
        const updatedUsers = userdata.map((user) =>
          user._id === id ? { ...user, approve: newApproveStatus } : user
        );
        setUserData(updatedUsers);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  // Filter to show only users with approve: false
  const filteredUsers = userdata.filter((user) => user.approve === false);

  return (
    <Fragment>
      <center>
        <h1>Admin Panel - Pending Approvals</h1>
      </center>

      {filteredUsers.length === 0 ? (
        <center>
          <p>No approvals pending.</p>
        </center>
      ) : (
        <div className="home-container">
          {filteredUsers.map((data, index) => (
            <div className="user-card" key={index}>
              <label>Property ID:</label>
                                <input type="text" value={data.propertyId} readOnly />
                                
                                <label>Company Name:</label>
                                <input type="text" value={data.companyName} readOnly />

                                <label>About Company:</label>
                                <input type="text" value={data.aboutCompany} readOnly />

                                <label>Property Name:</label>
                                <input type="text" value={data.propertyName} readOnly />

                                <label>Property Details:</label>
                                <input type="text" value={data.propertyDetails} readOnly />

                                <label>Features:</label>
                                <input type="text" value={data.features} readOnly />

                                <label>Amenities:</label>
                                <input type="text" value={data.amenities} readOnly />

                                <label>No. of Plots:</label>
                                <input type="text" value={data.noOfPlots} readOnly />

                                <label>Plot Size (Min):</label>
                                <input type="text" value={data.plotSizeMin} readOnly />

                                <label>Plot Size (Max):</label>
                                <input type="text" value={data.plotSizeMax} readOnly />

                                <label>Location:</label>
                                <input type="text" value={data.location} readOnly />

                                <label>Nearby Spots:</label>
                                <input type="text" value={data.nearbySpots} readOnly />

                                <label>Legalities:</label>
                                <input type="text" value={data.legalities} readOnly />

                                <label>Address:</label>
                                <input type="text" value={data.address} readOnly />

                                <label>Place:</label>
                                <input type="text" value={data.place} readOnly />

                                <label>Google Map:</label>
                                <input type="text" value={data.googleMap} readOnly />

                                <label>Launch Date:</label>
                                <input type="text" value={data.launchDate} readOnly />

                                <label>Plot Price:</label>
                                <input type="text" value={data.plotPrice} readOnly />
                                <label>Closed Plots / Remaining Plots:</label>
                                <input type='checkbox' checked={data.plot.one} readOnly />
                                <input type='checkbox' checked={data.plot.two} readOnly />
                                <input type='checkbox' checked={data.plot.three} readOnly />
                                <input type='checkbox' checked={data.plot.four} readOnly />
                                <input type='checkbox' checked={data.plot.five} readOnly />
                                <input type='checkbox' checked={data.plot.six} readOnly />
                                <input type='checkbox' checked={data.plot.seven} readOnly />
                                <input type='checkbox' checked={data.plot.eight} readOnly />
                                <input type='checkbox' checked={data.plot.nine} readOnly />
                                <input type='checkbox' checked={data.plot} readOnly />

                                <label>Status Approvel:</label>
                                <label>DTCP</label>
                                <input type='checkbox' checked={data.status.dtcp} readOnly />
                                <label>RERA</label>
                                <input type='checkbox' checked={data.status.rera} readOnly />

      


              <button className="approve-button" onClick={() => approveHandler(data._id, data.approve)}>
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Sellercontrol;

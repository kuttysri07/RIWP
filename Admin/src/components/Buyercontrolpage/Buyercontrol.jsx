import axios from 'axios';
import React, { Fragment ,useEffect,useState} from 'react'
import "./buyercontrol.css";
const APIURL = process.env.REACT_APP_API_URL;

const Buyercontrol = () => {

    const [userdata, setUserData] = useState([]);
    const [loading, setLoading] = useState(true); 
    

      // Fetch user data
  const handleFetch = () => {
    axios.get(`${APIURL}getnewhouserequest`)
      .then(res => {
        console.log(res.data);
        setUserData(res.data);
        setLoading(false); // Set loading false once data is fetched
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  


    // Handle approval of user data
    const approveHandler = (id, currentApproveStatus) => {
        // Toggle the approve status
        const newApproveStatus = !currentApproveStatus;
    
        // Update the user approval status in the backend
        axios.put(`${APIURL}updatenewhouses/${id}`, { approve: newApproveStatus })
          .then(res => {
            console.log(res.data);
    
            // Update the state to reflect the change
            const updatedUsers = userdata.map(user => 
              user._id === id ? { ...user, approve: newApproveStatus } : user
            );
            setUserData(updatedUsers);
          })
          .catch(err => console.log(err));
      };




      useEffect(() => {
        handleFetch();
      }, []);


      if (loading) {
        return <div>Loading...</div>; // Show loading indicator while data is being fetched
      }

      // Filter to show only users with approve: false
  const filteredUsers = userdata.filter(user => user.approve === false);
  return (
    <Fragment>
         <center><h1>Admin Panel - Pending Approvals</h1></center> 
{filteredUsers.length === 0 ? (
  <center>
  <p>No approvals pending.</p>
</center>
) :(
  <div className="home-container">
        {filteredUsers.map((data, index) => (
          <div className="user-card" key={index}>
           <label>Project Name:</label>
    <input type="text" value={data.projectName} readOnly />
    
    <label>Title:</label>
    <input type="text" value={data.title} readOnly />

    <label>Sale Type:</label>
    <input type="text" value={data.saleType} readOnly />

    <label>Society:</label>
    <input type="text" value={data.society} readOnly />

    <label>Approved Status (DTCP / RERA):</label>
    <input type="text" value={`DTCP: ${data.status.dtcp ? 'Yes' : 'No'} / RERA: ${data.status.rera ? 'Yes' : 'No'}`} readOnly />

    <label>Construction Status:</label>
    <input type="text" value={data.constructionStatus} readOnly />

    <label>House Type:</label>
    <input type="text" value={data.houseType} readOnly />

    <label>Budget:</label>
    <input type="text" value={data.budget} readOnly />

    <label>Build Up Area:</label>
    <input type="text" value={data.buildUpArea} readOnly />

    <label>Carpet Area:</label>
    <input type="text" value={data.carpetArea} readOnly />

    <label>Total Floors:</label>
    <input type="text" value={data.totalFloors} readOnly />

    <label>Bedrooms:</label>
    <input type="text" value={data.bedrooms} readOnly />

    <label>Bathrooms:</label>
    <input type="text" value={data.bathrooms} readOnly />

    <label>Balcony:</label>
    <input type="text" value={data.balcony} readOnly />

    <label>Furnishing:</label>
    <input type="text" value={data.furnishing} readOnly />

    <label>Car Parking:</label>
    <input type="text" value={data.carParking} readOnly />

    <label>Facing:</label>
    <input type="text" value={data.facing} readOnly />

    <label>Description:</label>
    <textarea value={data.description} readOnly></textarea>

    
            <button 
              className="approve-button" 
              onClick={() => approveHandler(data._id, data.approve)}
            >
              Approve
            </button>
          </div>
        ))}
      </div>
)}
         
    </Fragment>
  )
}

export default Buyercontrol
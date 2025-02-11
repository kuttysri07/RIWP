const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const PropertyModel = require("./Model/PropertyModel");
const NewHouseModel = require("./Model/NewHouseModel");
const path = require("path");
const BuyerModel = require("./Model/BuyerModel");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.dburl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

  // POST route for sellerregister

app.post("/propertyregister", async (req, res) => {
  try {
    const newUser = await PropertyModel.create(req.body);  // Create a new user in the database
    res.status(201).json(newUser);  // Respond with the created user
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/newhousesregister", async (req, res) => {
  try {
    const newUser = await BuyerModel.create(req.body);  // Create a new user in the database
    res.status(201).json(newUser);  // Respond with the created user
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});



  app.put('/updateproperty/:id', (req, res) => {
    const { id } = req.params;
    const { approve } = req.body;
  
    PropertyModel.findByIdAndUpdate(id, { approve}, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json({ error: err.message }));
  });

  app.put('/updatenewhouses/:id', (req, res) => {
    const { id } = req.params;
    const { approve } = req.body;
  
    NewHouseModel.findByIdAndUpdate(id, { approve}, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json({ error: err.message }));
  });

  app.delete("/deleteproperty/:id", async (req, res) => {
    const {id } = req.params
    try {
      const removeUser = await PropertyModel.findByIdAndDelete(id);  
      res.status(201).json(removeUser);  
    } catch (error) {
      console.error("Signup error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.delete("/deletenewhouses/:id", async (req, res) => {
    const {id } = req.params
    try {
      const removeUser = await NewHouseModel.findByIdAndDelete(id);  
      res.status(201).json(removeUser);  
    } catch (error) {
      console.error("Signup error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  app.get("/getproperty", async (req, res) => {
    try {
      const query = {
        approve: true // Ensure only approved users are fetched
    };
     // Add filters for name and/or state if provided
     if (req.query.industry) {
      query.industry = {
          $regex: req.query.industry,  // Search for partial matches
          $options: "i"  // Case-insensitive search
      };
  }
  if (req.query.category) {
    query.category = {
        $regex: req.query.category,  // Search for partial matches
        $options: "i"  // Case-insensitive search
    };
}
if (req.query.district) {
  query.district = {
      $regex: req.query.district,  // Search for partial matches
      $options: "i"  // Case-insensitive search
  };
}
  if (req.query.state) {
      query.state = {
          $regex: req.query.state,  // Search for partial matches
          $options: "i"  // Case-insensitive search
      };
  }
      const getUser = await PropertyModel.find(query);
      res.json(getUser); // Send the retrieved users as JSON response
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
    }
  });

  
  app.get("/getnewhouses", async (req, res) => {
    try {
      const query = {
        approve: true // Ensure only approved users are fetched
    };
     // Add filters for name and/or state if provided
     if (req.query.industry) {
      query.industry = {
          $regex: req.query.industry,  // Search for partial matches
          $options: "i"  // Case-insensitive search
      };
  }
  if (req.query.category) {
    query.category = {
        $regex: req.query.category,  // Search for partial matches
        $options: "i"  // Case-insensitive search
    };
}
if (req.query.district) {
  query.district = {
      $regex: req.query.district,  // Search for partial matches
      $options: "i"  // Case-insensitive search
  };
}
  if (req.query.state) {
      query.state = {
          $regex: req.query.state,  // Search for partial matches
          $options: "i"  // Case-insensitive search
      };
  }
      const getUser = await BuyerModel.find(query);
      res.json(getUser); // Send the retrieved users as JSON response
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
    }
  });
  
  
  

  app.get("/getpropertyrequest", async (req, res) => {
    try {
   
      const getUser = await PropertyModel.find({approve : false});
      res.json(getUser); // Send the retrieved users as JSON response
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
    }
  });

  
  app.get("/getnewhouserequest", async (req, res) => {
    try {
   
      const getUser = await NewHouseModel.find({approve : false});
      res.json(getUser); // Send the retrieved users as JSON response
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
    }
  });

  
  app.get("/getsinglehouse/:id", async (req, res) => {
    const { id } = req.params; // Get the id from the request params
    try {
        const getUser = await BuyerModel.findById(id); // Pass the id directly to findById
        if (!getUser) {
            return res.status(404).json({ error: "House not found" }); // Handle case where house is not found
        }
        res.json(getUser); // Send the retrieved house as JSON response
       
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" }); // Handle error and send a response
    }
});

  
app.get("/getsingleproperty/:id", async (req, res) => {
  const { id } = req.params; // Get the id from the request params
  try {
      const getUser = await PropertyModel.findById(id); // Pass the id directly to findById
      if (!getUser) {
          return res.status(404).json({ error: "House not found" }); // Handle case where house is not found
      }
      res.json(getUser); // Send the retrieved house as JSON response
    
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" }); // Handle error and send a response
  }
});



  app.put('/editproperty/:id', (req, res) => {
  const { id } = req.params;
  const  updateproperty = req.body;

  PropertyModel.findByIdAndUpdate(id, updateproperty, { new: true })
      .then(updatedUser => res.json(updatedUser))
      .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/editnewhouses/:id', (req, res) => {
  const { id } = req.params;
  const  updatenewhouse = req.body;

  NewHouseModel.findByIdAndUpdate(id, updatenewhouse, { new: true })
      .then(updatedUser => res.json(updatedUser))
      .catch(err => res.status(500).json({ error: err.message }));
});


  








// app.get("/getbuyerdata", async (req, res) => {
//   try {
//       const query = { approve: true }; // Only approved users

//       // Add filters for name and/or state if provided
//       if (req.query.industry) {
//           query.industry = {
//               $regex: req.query.industry,  // Search for partial matches
//               $options: "i"  // Case-insensitive search
//           };
//       }
//       if (req.query.category) {
//         query.category = {
//             $regex: req.query.category,  // Search for partial matches
//             $options: "i"  // Case-insensitive search
//         };
//     }
//     if (req.query.district) {
//       query.district = {
//           $regex: req.query.district,  // Search for partial matches
//           $options: "i"  // Case-insensitive search
//       };
//   }
//       if (req.query.state) {
//           query.state = {
//               $regex: req.query.state,  // Search for partial matches
//               $options: "i"  // Case-insensitive search
//           };
//       }

//       // Find users matching the query
//       const getUsers = await RegisterModel.find(query);

//       // If no users found, return a message
//       if (getUsers.length === 0) {
//           return res.status(404).json({ message: "No users found" });
//       }

//       // Otherwise, send the found users
//       res.json(getUsers);
//   } catch (error) {
//       console.log(error.message);
//       res.status(500).json({ error: "Internal server error" });
//   }
// });



// // POST route for login
// app.post("/formregister", async (req, res) => {
//   try {
//     const addUser = await RegisterModel.create(req.body); // Saving the approved user data
//     res.json(addUser);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: "Failed to save user" });
//   }
// });




// app.put('/update/:id', (req, res) => {
//   const { id } = req.params;
//   const { approve } = req.body;

//   RegisterModel.findByIdAndUpdate(id, { approve}, { new: true })
//       .then(updatedUser => res.json(updatedUser))
//       .catch(err => res.status(500).json({ error: err.message }));
// });





// app.delete("/removebuyerregister/:id", async (req, res) => {
//   const {id } = req.params
//   try {
//     const removeUser = await RegisterModel.findByIdAndDelete(id);  
//     res.status(201).json(removeUser);  
//   } catch (error) {
//     console.error("Signup error:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });



// Serve frontend
app.use(express.static(path.join(__dirname, "../RIC/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../RIC/build/index.html"));
    
});


// Start the server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});

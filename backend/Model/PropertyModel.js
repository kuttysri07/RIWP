const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    uploadimage: [String], // Changed to an array of strings for multiple image URLs
    state: String,
    district: String,
    propertytype: {
        hillArea :{ type: Boolean, default: false } ,
        farmLand :{ type: Boolean, default: false }
    },
    propertyId: String, 
    aboutCompany: String, 
    plotSizeMin: Number, 
    plotSizeMax: Number,
    location: String,
    nearbySpots: String,
    place: String,
    googleMap: String, 
    plotPrice: Number,
    approve: { type: Boolean, default: true },
    usedFor:{
        resorts :{ type: Boolean, default: false },
        agriculture :{ type: Boolean, default: false },
        clubs:{ type: Boolean, default: false }
    },
    support: {
        basicAmeneties :{ type: Boolean, default: false },
        premiumAmeneties  :{ type: Boolean, default: false },
        construction  :{ type: Boolean, default: false },
        propertyManagement  :{ type: Boolean, default: false },
        resortsManagement  :{ type: Boolean, default: false }
    },
    isAgreed :{ type: Boolean, default: false },
    
    plot: {  
        one: { type: Boolean, default: true },
        two: { type: Boolean, default: true },
        three: { type: Boolean, default: true },
        four: { type: Boolean, default: true },
        five: { type: Boolean, default: true },
        six: { type: Boolean, default: true },
        seven: { type: Boolean, default: true },
        eight: { type: Boolean, default: true },
        nine: { type: Boolean, default: true },
        ten: { type: Boolean, default: true }
    },
    status: {  
        dtcp: { type: Boolean, default: false },
        rera: { type: Boolean, default: false }
    },
  
});

const PropertyModel = mongoose.model("propertyregister", PropertySchema);

module.exports = PropertyModel;

const mongoose = require("mongoose");

const NewHouseSchema = new mongoose.Schema({
    projectName: {
        type: String,
    },
    title: {
        type: String,
    },
    saleType: {
        type: String,
    },
    society: {
        type: String,
    },
    status: {
        dtcp: {
            type: Boolean,
            default: false,
        },
        rera: {
            type: Boolean,
            default: false,
        },
    },
    constructionStatus: {
        type: String,
    },
    houseType: {
        type: String,
    },
    budget: {
        type: Number,
    },
    buildUpArea: {
        type: String,
    },
    carpetArea: {
        type: String,
    },
    totalFloors: {
        type: Number,
    },
    bedrooms: {
        type: Number,
    },
    bathrooms: {
        type: Number,
    },
    balcony: {
        type: String,
    },
    furnishing: {
        type: String,
    },
    carParking: {
        type: String,
    },
    facing: {
        type: String,
    },
    description: {
        type: String,
    },
    uploadimage: { 
        type: [String], // Array of strings to store multiple image URLs
    },
    approve: {
        type: Boolean,
        default: false, // Assume approval status is false by default
    },
});

const NewHouseModel = mongoose.model("NewHouse", NewHouseSchema);

module.exports = NewHouseModel;

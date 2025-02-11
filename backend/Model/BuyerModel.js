const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  state: String,
  district: String,
  propertytype: {
    hillArea: { type: Boolean, default: false },
    farmLand: { type: Boolean, default: false },
  },
  propertyId: String,
  aboutCompany: String,
  plotSizeMin: Number,
  plotSizeMax: Number,
  nearbySpots: {
    attapadi: { type: Boolean, default: true },
    anaikatti: { type: Boolean, default: true },
    vaalparai: { type: Boolean, default: true },
    ooty: { type: Boolean, default: true },
    kotagiri: { type: Boolean, default: true },
    conoor: { type: Boolean, default: true },
  },
  place: String,
  plotPrice: Number,
  approve: { type: Boolean, default: true },
  usedFor: {
    resorts: { type: Boolean, default: false },
    agriculture: { type: Boolean, default: false },
    clubs: { type: Boolean, default: false },
  },
  support: {
    basicAmeneties: { type: Boolean, default: false },
    premiumAmeneties: { type: Boolean, default: false },
    construction: { type: Boolean, default: false },
    propertyManagement: { type: Boolean, default: false },
    resortsManagement: { type: Boolean, default: false },
    incomeGeneration: { type: Boolean, default: false },
    resortMarketing: { type: Boolean, default: false },
  },
  gowith: {
    propertyManagementCompany: { type: Boolean, default: false },
    brokers: { type: Boolean, default: false },
  },

  otherRegion: {
    kodaikanal: { type: Boolean, default: false },
    sirumalai: { type: Boolean, default: false },
    yerkaud: { type: Boolean, default: false },
  },
  number:Number,
  features: { type: Boolean, default: false },
});

const BuyerModel = mongoose.model("buyerregister", PropertySchema);

module.exports = BuyerModel;

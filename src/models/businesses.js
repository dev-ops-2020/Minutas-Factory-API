const { Schema, model } = require('mongoose');

const BusinessesSchema = Schema(
  {
    id: {
      type: String
    },
    status: {
      type: Boolean,
      default: true // Change to false on deploy to production
    },
    // Owner info
    dui: {
      type: String
    },
    owner: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    pass: {
      type: String
    },
    token: {
      type: String,
      Default: '0000'
    },
    deviceId: {
      type: String,
      Default: '0000'
    },
    // Business info
    nrc: {
      type: String,
      Default: '0000'
    },
    type: {
      type: String, // Products || Services
    },
    logo: {
      type: String
    },
    name: {
      type: String
    },
    desc: {
      type: String
    },
    slogan: {
      type: String
    },
    address: {
      type: String
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    },
    loc: {
      type: {
        type: String,
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      }
    },
    fb: {
      type: String
    },
    ig: {
      type: String
    },
    wa: {
      type: String
    },
    delivery: {
      type: Boolean
    },
    membershipId: {
      type: String
    },
    priority: {
      type: Number
    },
    score: {
      type: Number
    },
    schedule: {
      type: []
    },
    categories: {
      type: []
    },
    pictures: {
      type: []
    },
  },
  {
    timestamps: true
  }
);

module.exports = model('businesses', BusinessesSchema);
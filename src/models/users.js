const { Schema, model } = require('mongoose');

const UsersSchema = Schema(
  {
    id: {
      type: String
    },
    status: {
      type: Boolean,
      default: true
    },
    name: {
      type: String
    },
    alias: {
      type: String,
      unique: true
    },
    phone: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    pass: {
      type: String
    },
    picture: {
      type: String
    },
    deviceId: {
      type: String,
      Default: '0000'
    },
    token: {
      type: String,
      Default: '0000'
    },
    qrCode: {
      type: String
    },
    points: {
      type: String
    },
    businessFav: {
      type: []
    },
  },
  {
    timestamps: true
  }
);

module.exports = model('users', UsersSchema);
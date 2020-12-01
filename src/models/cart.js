const { Schema, model } = require('mongoose');

const CartSchema = Schema(
  {
    id: {
      type: String
    },
    userId: {
      type: String
    },
    businessId: {
      type: String
    },
    products: {      
      type: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('cart', CartSchema);
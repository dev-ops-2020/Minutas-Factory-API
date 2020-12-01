const { Schema, model } = require('mongoose');

const ProductsSchema = Schema(
  {
    id: {
      type: String
    },
    type: {
      type: String
    },
    sku: {
      type: String
    },
    name: {
      type: String
    },
    desc: {
      type: String
    },
    price: {
      type: Number
    },
    available: {
      type: Boolean
    },
    pictures: {
      type: [],
    },
    tags: {
      type: [],
    },
    businessId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('products', ProductsSchema);
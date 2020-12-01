const { Schema, model } = require('mongoose');

const CategoriesSchema = Schema(
  {
    id: {
      type: String
    },
    status: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      unique: true
    },
    icon: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('categories', CategoriesSchema);
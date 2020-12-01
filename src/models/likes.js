const { Schema, model } = require('mongoose');

const LikeSchema = Schema(
  {
    id: {
      type: String
    },
    userId: {
      type: String
    },
    entryId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('like', LikeSchema);
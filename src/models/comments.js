const { Schema, model } = require('mongoose');

const CommentsSchema = Schema(
  {
    id: {
      type: String
    },
    comment: {
      type: String
    },
    date: {
      type: String
    },
    userId: {
      type: String
    },
    userAlias: {
      type: String
    },
    userPicture: {
      type: String
    },
    businessId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('comments', CommentsSchema);
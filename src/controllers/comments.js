const CommentsSchema = require('../models/comments');

function CreateComment(req, res) {
  let Comment = new CommentsSchema();
  Comment.comment = req.body.comment;
  Comment.date = req.body.date;
  Comment.idUser = req.body.idUser;
  Comment.nameUser = req.body.nameUser;
  Comment.pictureUser = req.body.pictureUser;
  Comment.idBusiness = req.body.idBusiness;
  Comment.save((err, Comment) => {
    if (err) {
      return res.status(202).send({message: 'Error posting comment'});
    } else {
    return res.status(200).send({message: 'Comment created', comment: Comment});
    }
  });
}

function ReadComment(req, res) {
  let id = req.params.id;
  CommentsSchema.findById(id, (err, Comment) => {
    if (!Comment) {
      return res.status(202).send({message: 'Comment not found'});
    } else {      
      return res.status(200).send({message: 'Comment read', comment: Comment});
    }
  });
}

function UpdateComment(req, res) {
  let id = req.params.id;
  let Comment = req.body;
  CommentsSchema.findByIdAndUpdate(id, Comment, (err, Comment) => {
    if (err) {
      return res.status(202).send({message: 'Update failed'});
    } else {      
      return res.status(200).send({message: 'Comment updated'});
    }
  });
}

function DeleteComment(req, res) {
  let id = req.params.id;
  CommentsSchema.findByIdAndDelete(id, (err, Comment) => {
    if (err) {
      return res.status(202).send({message: 'Error deleting comment'});
    } else {
    return res.status(200).send({message: 'Comment deleted'});
  }
  });
}

function ListComments(req, res) {
  CommentsSchema.find({}, (err, Comments) => {
    if (Comments.length == 0) {
      return res.status(202).send({message: 'No comments to show'});
    } else {
      return res.status(200).send({message: 'Ok', comments: Comments});
    }
  });
}

function ListCommentsByBusiness(req, res) {
  let id = req.params.id;
  CommentsSchema.find({idBusiness: id}, (err, Comments) => {
    if (Comments.length == 0) {
      return res.status(202).send({message: 'No comments to show'});
    } else {
      return res.status(200).send({message: 'Ok', comments: Comments});
    }
  });
}

module.exports = {
  CreateComment,
  ReadComment,
  UpdateComment,
  DeleteComment,
  ListComments,
  ListCommentsByBusiness
};
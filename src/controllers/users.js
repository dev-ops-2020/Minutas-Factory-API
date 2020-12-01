const UsersSchema = require('../models/users');
const bcrypt = require('bcrypt');
const service = require('../services/index');

function SignUp(req, res) {
  let User = new UsersSchema();
  User.name = req.body.name;
  User.alias = req.body.alias;
  User.phone = req.body.phone;
  User.email = req.body.email;
  User.pass = req.body.pass;

  bcrypt.hash(User.pass, bcrypt.genSaltSync(7), (err, hash) => {
    User.pass = hash;
    User.token = service.createToken(User);
    User.deviceId = req.body.deviceId;
    User.picture = 'https://api.adorable.io/avatars/'+User.alias;
    User.save((err) => {
      if (err) {
        return res.status(202).send({message: 'Error'});
      } else {
        return res.status(200).send({message: 'Ok', user: User});
      }
    });
  });  
}

function SignIn(req, res) {
  let email = req.body.email;
  let pass = req.body.pass;
  UsersSchema.findOne({email}, (err, User) => {
    if (!User || !User.status) {
      return res.status(202).send({message: 'Object not found'});
    } else {
      bcrypt.compare(pass, User.pass, function(err, match) {
        if (!match) {
          return res.status(202).send({message: 'Passwords do not match'});
        } else {
          return res.status(200).send({message: 'Ok', object: User});
        }     
      });
    }
  });  
}

function ReadUser(req, res) {
  let id = req.params.id;
  UsersSchema.findById(id, (err, User) => {
    if (!User) {
      return res.status(202).send({message: 'User not found'});
    } else if (!User.status) {
      return res.status(202).send({message: 'User deleted...'});
    } else {      
      return res.status(200).send({message: 'User read', user: User});
    }
  });
}

function UpdateUser(req, res) {
  let id = req.params.id;
  let User = req.body;
  UsersSchema.findByIdAndUpdate(id, User, (err, User) => {
    if (err) {
      return res.status(202).send({message: 'Update failed'});
    } else if (!User.status) {
      return res.status(202).send({message: 'User deleted...'});
    } else {
      return res.status(200).send({message: 'User updated'});
    }
  });
}

function DeleteUser(req, res) {
  let id = req.params.id;
  UsersSchema.findById(id, (err, User) => {
    if (!User) {
      return res.status(202).send({message: 'User not found'});
    } else {
      UsersSchema.findByIdAndUpdate(id, {$set: {status: false}}, (err, User) => {
        return res.status(200).send({message: 'User deleted'});
      });
    }
  });
}

module.exports = {
  SignUp,
  SignIn,
  ReadUser,
  UpdateUser,
  DeleteUser
};
const BusinessesSchema = require('../models/businesses');
const bcrypt = require('bcrypt');
const service = require('../services/index');

function SignUp(req, res) {
  let Business = new BusinessesSchema();
  // Owner info
  Business.dui = req.body.dui;
  Business.owner = req.body.owner;
  Business.phone = req.body.phone;
  Business.email = req.body.email;
  Business.pass = req.body.pass;

  bcrypt.hash(Business.pass, bcrypt.genSaltSync(7), (err, hash) => {
    Business.pass = hash;
    Business.token = service.createToken(Business);
    Business.deviceId = req.body.deviceId;
    // Business info
    Business.nrc = req.body.nrc;
    Business.type = req.body.type;
    Business.logo = req.body.logo;
    Business.name = req.body.name;
    Business.desc = req.body.desc;
    Business.slogan = req.body.slogan;
    Business.address = req.body.address;
    Business.lat = req.body.lat;
    Business.lng = req.body.lng;
    Business.loc = {type: 'Point', coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]}
    Business.fb = 'https://www.facebook.com/'+req.body.fb;
    Business.ig = 'https://www.instagram.com/'+req.body.ig;
    Business.wa = 'https://api.whatsapp.com/send?phone='+req.body.wa;
    Business.delivery = req.body.delivery;
    Business.membershipId = req.body.membershipId;
    Business.priority = req.body.priority;
    Business.score = req.body.score;
    Business.schedule = req.body.schedule;
    Business.categories = req.body.categories;
    Business.pictures = req.body.pictures;
    Business.save((err, Business) => {
      if (err) {
        return res.status(202).send({message: 'Error'});
      } else {
      return res.status(200).send({message: 'Ok', business: Business});
      }
    });   
  });
}

function SignIn(req, res) {
  let email = req.body.email;
  let pass = req.body.pass;
  BusinessesSchema.findOne({email}, (err, Business) => {
    if (!Business || !Business.status) {
      return res.status(202).send({message: 'Object not found'});
    } else {
      bcrypt.compare(pass, Business.pass, function(err, match) {
        if (!match) {
          return res.status(202).send({message: 'Passwords do not match'});
        } else {
          return res.status(200).send({message: 'Ok', object: Business});
        }     
      });
    }
  });  
}

function ReadBusiness(req, res) {
  let id = req.params.id;
  BusinessesSchema.findById(id, (err, Business) => {
    if (!Business) {
      return res.status(202).send({message: 'Business not found'});
    } else if (!Business.status) {
      return res.status(202).send({message: 'Business deleted...'});
    } else {      
      return res.status(200).send({message: 'Business read', business: Business});
    }
  });
}

function UpdateBusiness(req, res) {
  let id = req.params.id;
  let Business = req.body;
  BusinessesSchema.findByIdAndUpdate(id, Business, (err, Business) => {
    if (err) {
      return res.status(202).send({message: 'Update failed'});
    } else if (!Business.status) {
      return res.status(202).send({message: 'Business deleted...'});
    } else {      
      return res.status(200).send({message: 'Business updated'});
    }
  });
}

function DeleteBusiness(req, res) {
  let id = req.params.id;
  BusinessesSchema.findById(id, (err, Business) => {
    if (!Business) {
      return res.status(202).send({message: 'Business not found'});
    } else {
      BusinessesSchema.findByIdAndUpdate(id, {$set: {status: false}}, (err, Business) => {
        return res.status(200).send({message: 'Business deleted'});
      });
    }
  });
}
// Test
function ListBusinesses(req, res) {
  let id = req.params.id;
  BusinessesSchema.find({status: true/*, categories: {category: id}*/}, /*'name -_id',*/ (err, Businesses) => {
    if (Businesses.length == 0) {
      return res.status(202).send({message: 'No businesses to show'});
    } else {
      return res.status(200).send({message: 'Ok', businesses: Businesses});
    }
  });
}

function ListBusinessesByCategory(req, res) {
  let id = req.params.id;
  let lng = parseFloat(req.params.lng);
  let lat = parseFloat(req.params.lat);
  let maxD = parseFloat(req.params.maxD);
  let point = {
    type: 'Point',
    coordinates: [lng, lat]
  };
  let filter = req.params.filter;
  let mFilter = { membershipPriority: 1 };
  if (filter === 'near')
    mFilter = { 'dist.calculated': 1, 'name': 1 };
  else if (filter === 'score')
    mFilter = { score: 1 };
    BusinessesSchema.aggregate(
      [{'$geoNear': {
          key: 'loc',
          near: point,
          spherical: true,
          maxDistance: maxD,
          includeLocs: 'dist.location',
          distanceField: 'dist.calculated',
          distanceMultiplier : 0.001
          }
        },
        {$sort : mFilter},
        {$match: {status: true, categories: {category: id}}}
      ],
      function(err, Businesses) {
        if (err) {
          return res.status(202).send({message: 'Something went wrong' +err});
        } else if (Businesses.length == 0) {
          return res.status(202).send({message: 'No businesses to show'});
        } else {
          return res.status(200).send({message: 'Ok', businesses: Businesses});
        }
      }
    );  
}

module.exports = {
  SignUp,
  SignIn,
  ReadBusiness,
  UpdateBusiness,
  DeleteBusiness,
  ListBusinesses,
  ListBusinessesByCategory
};
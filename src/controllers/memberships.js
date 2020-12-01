const MembershipsSchema = require('../models/memberships');
/*
function CreateMembership(req, res) {
  let Membership = new MembershipsSchema();
  Membership.name = req.body.name;
  Membership.desc = req.body.desc;
  Membership.icon = req.body.icon;
  Membership.price = req.body.price;
  Membership.priceOff = req.body.priceOff;
  Membership.priority = req.body.priority;
  Membership.pictures = req.body.pictures;
  Membership.entries = req.body.entries;
  Membership.save((err, Membership) => {
    if (err) {
      return res.status(202).send({message: 'Error creating membership'});
    } else {
    return res.status(200).send({message: 'Membership created', membership: Membership});
    }
  });
}
*/
function ReadMembership(req, res) {
  let id = req.params.id;
  MembershipsSchema.findById(id, (err, Membership) => {
    if (!Membership) {
      return res.status(202).send({message: 'Membership not found'});
    } else {
      return res.status(200).send({message: 'Membership read', membership: Membership});
    }
  });
}

function ListMemberships(req, res) {
  MembershipsSchema.find({}, (err, Memberships) => {
    if (Memberships.length == 0) {
      return res.status(202).send({message: 'No memberships to show'});
    } else {
      return res.status(200).send({message: 'Ok', memberships: Memberships});
    }
  }).sort({priority: -1});
}

module.exports = {
  //CreateMembership,
  ReadMembership,
  ListMemberships
};
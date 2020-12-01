const EntriesSchema = require('../models/entries');
const LikesSchema = require('../models/likes');
const moment = require('moment');
const momentz = require('moment-timezone');

function CreateEntry(req, res) {
  moment.locale('es');
  const sv = momentz.tz(moment().format(), "America/El_Salvador");
  const date = sv.format('L');
  const time = sv.format('LTS');
  const current = date + "-" + time;
  let Entry = new EntriesSchema();
  Entry.image = req.body.image;
  Entry.desc = req.body.desc;
  Entry.date = current;
  Entry.businessId = req.body.businessId;
  Entry.save((err, Entry) => {
    if (err) {
      return res.status(202).send({message: 'Error creating entry'});
    } else {
    return res.status(200).send({message: 'Entry created', entry: Entry});
    }
  });
}

function ReadEntry(req, res) {
  let id = req.params.id;
  EntriesSchema.findById(id, (err, Entry) => {
    if (!Entry) {
      return res.status(202).send({message: 'Entry not found'});
    } else if (!Entry.status) {
      return res.status(202).send({message: 'Entry deleted...'});
    } else {
      return res.status(200).send({message: 'Entry read', entry: Entry});
    }
  });
}

function ListEntries(req, res) {
  EntriesSchema.find({status: true}, (err, Entries) => {
    if (Entries.length == 0) {
      return res.status(202).send({message: 'No entries to show'});
    } else {
      return res.status(200).send({message: 'Ok', entries: Entries});
    }
  }).sort({date: -1});
}

function ListEntriesByBusiness(req, res) {
  let id = req.params.id;
  EntriesSchema.find({businessId: id}, (err, Entries) => {
    if (Entries.length == 0) {
      return res.status(202).send({message: 'No entries to show'});
    } else {
      return res.status(200).send({message: 'Ok', entries: Entries});
    }
  }).sort({date: -1});
}

function ListEntriesLikedByUser(req, res) {
  let id = req.params.id;
  LikesSchema.find({userId: id}, (err, Entries) => {
    if (Entries.length == 0) {
      return res.status(202).send({message: 'No entries liked'});
    } else {
      return res.status(200).send({message: 'Ok', entries: Entries});
    }
  });
}

function LikeEntry(req, res) {
  let Like = new LikesSchema();
  Like.userId = req.params.userId;
  Like.entryId = req.params.entryId;
  Like.save((err, Like) => {
    if (err) {
      return res.status(202).send({message: 'Error'});
    } else {
      let id = req.params.entryId;
      EntriesSchema.findByIdAndUpdate(id, {$set: {likes: req.body.likes}}, (err, Entry) => {
        if (!err) {
          return res.status(200).send({message: 'Ok'});      
        } else {
          return res.status(202).send({message: 'Error'});
        }
      }); 
    }
  });  
}

function UnlikeEntry(req, res) {
  let userId = req.params.userId;
  let entryId = req.params.entryId;
  LikesSchema.findOneAndDelete({userId}, (err, Like) => {
    if (err) {
      return res.status(202).send({message: err});
    } else {
      let id = req.params.entryId;
      EntriesSchema.findByIdAndUpdate(id, {$set: {likes: req.body.likes}}, (err, Entry) => {
        if (!err) {
          return res.status(200).send({message: 'Ok'});      
        } else {
          return res.status(202).send({message: 'Error 2'});
        }
      }); 
    }
  });  
}

function CountEntries(req, res) {
  let id = req.params.id;
  EntriesSchema.countDocuments({ businessId: id }).exec((err, Count) => {
    if (Count < 5) {
      return res.status(202).send({message: 'Ok', count: Count});
    } else {
      return res.status(202).send({message: 'Entries limit reached'});
    };
  });
}

module.exports = {
  CreateEntry,
  ReadEntry,
  ListEntries,
  ListEntriesByBusiness,
  ListEntriesLikedByUser,
  LikeEntry,
  UnlikeEntry,
  CountEntries
};
const CategoriesSchema = require('../models/categories');
/*
function CreateCategory(req, res) {
  let Category = new CategoriesSchema();
  Category.name = req.body.name;
  Category.icon = req.body.icon;
  Category.status = true;
  Category.save((err, Category) => {
    if (err) {
      return res.status(202).send({message: 'Error creating category'});
    } else {
    return res.status(200).send({message: 'Category created', category: Category});
    }
  });
}
*/
function ReadCategory(req, res) {
  let id = req.params.id;
  CategoriesSchema.findById(id, (err, Category) => {
    if (!Category) {
      return res.status(202).send({message: 'Category not found'});
    } else if (!Category.status) {
      return res.status(202).send({message: 'Category deleted...'});
    } else {
      return res.status(200).send({message: 'Category read', category: Category});
    }
  });
}

function ListCategories(req, res) {
  CategoriesSchema.find({status: true}, (err, Categories) => {
    if (Categories.length == 0) {
      return res.status(202).send({message: 'No categories to show'});
    } else {
      return res.status(200).send({message: 'Ok', categories: Categories});
    }
  }).sort({name: 1});
}

module.exports = {
  //CreateCategory,
  ReadCategory,
  ListCategories
};
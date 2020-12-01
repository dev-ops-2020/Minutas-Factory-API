const ProductsSchema = require('../models/products');

function CreateProduct(req, res) {
  let Product = new ProductsSchema();
  Product.type = req.body.type;
  Product.sku = req.body.sku;
  Product.name = req.body.name;
  Product.desc = req.body.desc;
  Product.price = req.body.price;
  Product.available = req.body.available;
  Product.pictures = req.body.pictures;
  Product.tags = req.body.tags;
  Product.businessId = req.body.businessId;
  Product.save((err, Product) => {
    if (err) {
      return res.status(202).send({message: 'Error storing Product'});
    } else {
    return res.status(200).send({message: 'Product stored', product: Product});
    }
  });
}

function ReadProduct(req, res) {
  let id = req.params.id;
  ProductsSchema.findById(id, (err, Product) => {
    if (!Product) {
      return res.status(202).send({message: 'Product not found'});
    } else if (!Product.available) {
      return res.status(202).send({message: 'Product not available'});
    } else {      
      return res.status(200).send({message: 'Product read', product: Product});
    }
  });
}

function UpdateProduct(req, res) {
  let id = req.params.id;
  let Product = req.body;
  ProductsSchema.findByIdAndUpdate(id, Product, (err, Product) => {
    if (err) {
      return res.status(202).send({message: 'Update failed'});
    } else {      
      return res.status(200).send({message: 'Product updated', product: Product});
    }
  });
}

function DeleteProduct(req, res) {
  let id = req.params.id;
  ProductsSchema.findById(id, (err, Product) => {
    if (!Product) {
      return res.status(202).send({message: 'Product not found'});
    } else {
      ProductsSchema.findByIdAndDelete(id, (err, Product) => {
        return res.status(200).send({message: 'Product deleted', product: Product});
      });
    }
  });
}

function ListProducts(req, res) {
  ProductsSchema.find({available: true}, (err, Products) => {
    if (Products.length == 0) {
      return res.status(202).send({message: 'No products to show'});
    } else {
      return res.status(200).send({message: 'Ok', products: Products});
    }
  });
}

function ListProductsByBusiness(req, res) {
  let id = req.params.id;
  ProductsSchema.find({businessId: id, available: true}, (err, Products) => {
    if (Products.length == 0) {
      return res.status(202).send({message: 'No products to show'});
    } else {
      return res.status(200).send({message: 'Ok', products: Products});
    }
  });
}

function ListProductsByTags(req, res) {
  let tag = req.params.tag;
  ProductsSchema.find({available: true, tags: tag}, (err, Products) => {
    if (Products.length == 0) {
      return res.status(202).send({message: 'No products to show'});
    } else {
      return res.status(200).send({message: 'Ok', products: Products});
    }
  });
}

function ListProductsAvailable(req, res) {
  let id = req.params.id;
  ProductsSchema.find({businessId: id, available: true}, (err, Products) => {
    if (Products.length == 0) {
      return res.status(202).send({message: 'Error'});
    } else {
      return res.status(200).send({message: 'Ok', products: Products})
    }
  });
}

function ListProductsUnavailable(req, res) {
  let id = req.params.id;
  ProductsSchema.find({businessId: id, available: false}, (err, Products) => {
    if (Products.length == 0) {
      return res.status(202).send({message: 'Error'});
    } else {
      return res.status(200).send({message: 'Ok', products: Products})
    }
  });
}

function ChangeState(req, res) {  
  let id = req.params.id;
  ProductsSchema.findByIdAndUpdate(id, {$set: {available: req.body.available}}, (err, Product) => {
    if (!err) {
      return res.status(200).send({message: 'Ok'});
    } else {
      return res.status(202).send({message: 'Error'});
    }
  });   
}

module.exports = {
  CreateProduct,
  ReadProduct,
  UpdateProduct,
  DeleteProduct,
  ListProducts,
  ListProductsByBusiness,
  ListProductsByTags,
  ListProductsAvailable,
  ListProductsUnavailable,
  ChangeState
};
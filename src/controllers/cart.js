const CartSchema = require('../models/cart');
//const BusinessesSchema = require('../models/businesses');

function Cart(req, res) {
  let userId = req.params.userId;
  let productId = req.body.productId;
  let qty = req.body.qty;
  CartSchema.findOne({userId}, (err, Cart) => {
    if (!Cart) {
      let newCart = new CartSchema();
      newCart.userId = req.body.userId;
      newCart.businessId = req.body.businessId;
      newCart.save((err, newCart) => {
      if (err) {
        return res.status(202).send({message: 'Error'});
      } else {
        CartSchema.findOne({'products.productId': productId}, (err, Cart) => {
          if (Cart) {
            CartSchema.updateOne({'products.productId': productId}, {$set: {'products.$.qty': qty}}, (err, Cart) => {
              return res.status(200).send({message: 'Product updated'});
            });
          } else {
            let Product = req.body;
            CartSchema.findByIdAndUpdate(cartId, {$push: {products: Product}}, (err, Cart) => {
              return res.status(200).send({message: 'Product added'});
            });
          }
        });
      }
    });
  } else {
    CartSchema.findOne({'products.productId': productId}, (err, Cart) => {
      if (Cart) {
        CartSchema.updateOne({'products.productId': productId}, {$set: {'products.$.qty': qty}}, (err, Cart) => {
          return res.status(200).send({message: 'Product updated'});
        });
      } else {
        let Product = req.body;
        CartSchema.findByIdAndUpdate(cartId, {$push: {products: Product}}, (err, Cart) => {
          return res.status(200).send({message: 'Product added'});
        });
      }
    });
  }
  });
}
/*
function CreateCart(req, res) {
  let Cart = new CartSchema();
  Cart.userId = req.body.userId;
  Cart.businessId = req.body.businessId;
  Cart.save((err, Cart) => {
    if (err) {
      return res.status(202).send({message: 'Error'});
    } else {
      return res.status(200).send({message: 'Ok', cart: Cart._id});
    }
  });
}

function ReadCart(req, res) {
  let cartId = req.params.cartId;
  let userId = req.params.userId;
  let businessId = req.params.businessId;
  CartSchema.findOne({userId}, (err, User) => {
    if (!User) {
      res.status(202).send({message: 'Wrong user'}); // Cart from other user
    } else {
      CartSchema.findOne({businessId}, (err, Business) => {
        if (!Business) {
          return res.status(202).send({message: 'Wrong business'}); // Cart from other business
        } else {
          CartSchema.findById(cartId, (err, Cart) => {
            if (!Cart) {
              return res.status(202).send({message: 'Wrong cart'}); // Cart doesn't exist
            } else {
              return res.status(200).send({message: 'Ok', products: Cart.products});
            }
          }).sort({productId: -1});
        }
      });
    }
  });
}

function UpdateCart(req, res) {
  let cartId = req.params.cartId;
  let userId = req.params.userId;
  let businessId = req.params.businessId;
  CartSchema.findOne({userId}, (err, User) => {
    if (!User) {
      res.status(202).send({message: 'Wrong user'}); // Cart from other user
    } else {
      CartSchema.findOne({businessId}, (err, Business) => {
        if (!Business) {
          return res.status(202).send({message: 'Wrong business'}); // Cart from other business
        } else {
          let productId = req.body.productId;
          let qty = req.body.qty;
          CartSchema.findOne({'products.productId': productId}, (err, Cart) => {
            if (Cart) {
              CartSchema.updateOne({'products.productId': productId}, {$set: {'products.$.qty': qty}}, (err, Cart) => {
                return res.status(200).send({message: 'Product updated'});
              });
            } else {
              let Product = req.body;
              CartSchema.findByIdAndUpdate(cartId, {$push: {products: Product}}, (err, Cart) => {
                return res.status(200).send({message: 'Product added'});
              });
            }
          });
        }
      });
    }
  });
}

function DeleteCart(req, res) {
  let id = req.params.id;
  CartSchema.findByIdAndDelete(id, (err, Cart) => {
    if (err) {
      return res.status(202).send({message: 'Error'});
    } else {      
      return res.status(200).send({message: 'Ok', cart: Cart});
    }
  });
}

function DeleteCartProduct(req, res) {
  let cartId = req.params.cartId;
  CartSchema.findById(cartId, (err, Cart) => {
    if (!Cart) {
      return res.status(202).send({message: 'Error'}); // Cart doesn't exist
    } else {      
      let productId = req.params.productId;
      CartSchema.findOne({'products.productId': productId}, (err, Cart) => {
        if (Cart) {
          let Product = req.body;
          CartSchema.updateOne({'products.productId': productId}, {$pull: {products: Product}}, (err, Cart) => {
            return res.status(200).send({message: 'Product deleted'});
          });
        } else {
          return res.status(202).send({message: 'Product not found'});
        }      
      });
    }
  });  
}
*/
module.exports = {
  Cart
  //CreateCart,
  //ReadCart,
  //UpdateCart,
  //DeleteCart,
  //DeleteCartProduct
};
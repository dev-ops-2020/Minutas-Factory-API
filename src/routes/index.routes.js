const { Router } = require('express');
const router = Router();

// Controllers
const IndexController = require('../controllers/index');
const UsersController = require('../controllers/users');
const BusinessesController = require('../controllers/businesses');
const CategoriesController = require('../controllers/categories');
const MembershipsController = require('../controllers/memberships');
const CommentsController = require('../controllers/comments');
const ProductsController = require('../controllers/products');
const CartController = require('../controllers/cart');
const EntriesController = require('../controllers/entries');

// First route
router.get('', IndexController.Index);
router.get('/terms', IndexController.Terms);

// Users
router.post('/signup/user', UsersController.SignUp);
router.post('/signin/user', UsersController.SignIn);
router.get('/users/:id', UsersController.ReadUser);
router.put('/users/:id', UsersController.UpdateUser);
router.post('/users/:id', UsersController.DeleteUser);

// Businesses
router.post('/signup/business', BusinessesController.SignUp);
router.post('/signin/business', BusinessesController.SignIn);
router.get('/businesses/:id', BusinessesController.ReadBusiness);
router.put('/businesses/:id', BusinessesController.UpdateBusiness);
router.post('/businesses/:id', BusinessesController.DeleteBusiness);
router.get('/businesses/category/:id', BusinessesController.ListBusinesses); // Test
router.get('/businesses/category/:id/:filter/:lat/:lng/:maxD', BusinessesController.ListBusinessesByCategory);
//router.get('businesses/user/:id', BusinessesController.ListBusinessesByUserFav);

// Categories
//router.post('/categories', CategoriesController.CreateCategory);
router.get('/categories/:id', CategoriesController.ReadCategory);
router.get('/categories', CategoriesController.ListCategories);

// Memberships
//router.post('/memberships', MembershipsController.CreateMembership);
router.get('/memberships/:id', MembershipsController.ReadMembership);
router.get('/memberships', MembershipsController.ListMemberships);

// Comments
router.post('/comments', CommentsController.CreateComment);
router.get('/comments/:id', CommentsController.ReadComment);
router.put('/comments/:id', CommentsController.UpdateComment);
router.post('/comments/:id', CommentsController.DeleteComment);
router.get('/comments/business/:id', CommentsController.ListCommentsByBusiness)

//Products
router.post('/products', ProductsController.CreateProduct);
router.get('/products/:id', ProductsController.ReadProduct);
router.put('/products/:id', ProductsController.UpdateProduct);
router.post('/products/:id', ProductsController.DeleteProduct);
router.get('/products', ProductsController.ListProducts);
router.get('/products/business/:id', ProductsController.ListProductsByBusiness);
router.get('/products/tag/:tag', ProductsController.ListProductsByTags);
router.get('/products/available/:id', ProductsController.ListProductsAvailable);
router.get('/products/unavailable/:id', ProductsController.ListProductsUnavailable);
router.post('/products/change_state/:id', ProductsController.ChangeState);

//Cart
//router.post('/cart/', CartController.CreateCart);
//router.get('/cart/:cartId/:userId/:businessId', CartController.ReadCart);
//router.put('/cart/:cartId/:userId/:businessId', CartController.UpdateCart);
//router.post('/cart/:id', CartController.DeleteCart);
//router.post('/cart/:cartId/:productId', CartController.DeleteCartProduct);
router.post('cart/:userId', CartController.Cart);

//Entries
router.post('/entries', EntriesController.CreateEntry);
router.get('/entries/:id', EntriesController.ReadEntry);
router.get('/entries', EntriesController.ListEntries);
router.get('/entries/business/:id', EntriesController.ListEntriesByBusiness);
router.get('/entries/user/:id/', EntriesController.ListEntriesLikedByUser);
router.post('/entries/like/:userId/:entryId', EntriesController.LikeEntry);
router.post('/entries/unlike/:userId/:entryId', EntriesController.UnlikeEntry);
router.get('/entries/count/:id', EntriesController.CountEntries);

module.exports = router;
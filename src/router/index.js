const express = require('express');
// const exampleController = require("../controllers/ExampleController")
const menuController = require('../controllers/menuController');
const categoriesController = require('../controllers/categoriesController');
const customerController = require('../controllers/customerController');
const router = express.Router();

// router.get('/menus',exampleController.getAll)

router.get('/menus', menuController.getAll);
router.post('/menus', menuController.create);
router.get('/menus/:id', menuController.getOneById);
router.patch('/menus/:id', menuController.update);
router.delete('/menus/:id', menuController.delete);

// Categories
router.get('/categories', categoriesController.getAll);
router.post('/categories', categoriesController.create);
router.patch('/categories/:id', categoriesController.update);
router.get('/categories/:id', categoriesController.getOneById);
router.delete('/categories/:id', categoriesController.delete);

// Customer
router.get('/customer', customerController.getAll);
router.post('/customer', customerController.create);
router.get('/customer/:id', customerController.getOneById);
router.patch('/customer/:id', customerController.update);
router.delete('/customer/:id', customerController.delete);

module.exports = router;

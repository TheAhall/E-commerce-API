//productRoutes.js
const express = require('express');
const {
    createProduct,
    getProducts,
    getCategory,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/multer');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/category/:category', getCategory);
router.get('/:id', getProduct);

// Protected routes (with image upload handling)
router.post('/create', protect, upload.any('image'), createProduct);
router.put('/:id', protect, upload.any('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;

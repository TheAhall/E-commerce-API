//productController.js
const Product = require('../models/productModel');

// Create a product
exports.createProduct = async (req, res) => {
    const { name, description, category, price, stock, imageUrl } = req.body;
    try {
        const product = new Product({ name, description, category, price, stock, imageUrl });
        product.imageUrl = filename;
        await product.save();
        res.status(201).json(product);
        filename = '';
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get products in category
exports.getCategory = async (req, res) => {
    try {
        const product = await Product.find({category : req.params.category});
        if (!product) {
            return res.status(404).json({ message: 'Products not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// stripeService.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/productModel');

exports.processPurchase = async (req, res) => {
    const { products, token } = req.body;

    try {
        // Calculate total price
        let totalAmount = 0;
        for (let i = 0; i < products.length; i++) {
            const product = await Product.findById(products[i].productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${products[i].productId} not found` });
            }
            totalAmount += product.price * products[i].quantity;
        }

        // Create Stripe charge
        const charge = await stripe.charges.create({
            amount: totalAmount * 100, // Convert to cents
            currency: 'usd',
            source: token.id,
            description: 'E-commerce purchase'
        });

        // Update stock for each product
        for (let i = 0; i < products.length; i++) {
            const product = await Product.findById(products[i].productId);
            if (product.stock >= products[i].quantity) {
                product.stock -= products[i].quantity;
                await product.save();
            } else {
                return res.status(400).json({ message: `Not enough stock for product: ${product.name}` });
            }
        }

        res.json({ success: true, charge, products });
    } catch (error) {
        res.status(500).json({ message: 'Payment processing failed', error: error.message });
    }
};
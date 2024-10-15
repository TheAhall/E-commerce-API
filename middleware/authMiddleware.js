//authMiddleware.js
const jwt = require('jsonwebtoken');

// Protect middleware to verify JWT
exports.protect = (req, res, next) => {
    // Retrieve the token from the Authorization header
    const rawToken = req.header('Authorization');
    const token = rawToken.startsWith('Bearer ') ? rawToken.split(' ')[1] : rawToken;
    
    // If no token is provided, return an unauthorized response
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    console.log("Token received: ", token);

    const decoded = jwt.decode(token); // Use jwt.decode() for inspection, not verification
    console.log("Decoded Token: ", decoded);


    try {
        // Verify the token using the secret key stored in environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user ID to the request object
        req.user = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, return an error
        res.status(401).json({ message: 'Token is not valid' });
    }
};

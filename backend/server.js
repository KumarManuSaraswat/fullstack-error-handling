// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware to parse JSON and allow frontend requests
app.use(cors());
app.use(express.json());

// 1. The Intentionally Failing Route
app.post('/api/submit', (req, res, next) => {
    const { username } = req.body;

    // Simulate a missing required field error
    if (!username) {
        const error = new Error('Username is a required field.');
        error.status = 400; // Bad Request
        return next(error); // Forwarding the error to the global handler
    }

    res.status(200).json({ success: true, message: 'Submission successful!' });
});

// 2. Global Error Handling Middleware (Must have 4 parameters)
app.use((err, req, res, next) => {
    console.error('Error caught in middleware:', err.message);
    
    const statusCode = err.status || 500;
    
    // Consistent error response format
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
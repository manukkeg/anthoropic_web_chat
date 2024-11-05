const express = require('express');
const axios = require('axios');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Define the /api/chat endpoint
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    // Validate that a message was provided in the request body
    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required.' });
    }
    try {
        const response = await axios.post(
            'https://api.anthropic.com/v1/messages',  
            {
                model: "claude-3-5-sonnet-20241022", 
                max_tokens: 1024,
                messages: [
                    { role: "user", content: userMessage }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.ANTHROPIC_API_KEY, 
                    'anthropic-version': '2023-06-01' 
                }
            }
        );
    
        // Log the entire response object for debugging
        console.log("API Response:", response.data); 
    
        // Adjust this line based on the actual response structure
        const generatedText = response.data.completion || response.data; 
        res.json({ reply: generatedText });
    } catch (error) {
        console.error('Error communicating with Anthropic API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch response from Anthropic API.' });
    }
    
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

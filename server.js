// Load environment variables
require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');

// Initialize Express app
const app = express();
app.use(express.json());

// Setup OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create a simple route to process text
app.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    // Call OpenAI API for text generation
    const response = await client.responses.create({
      model: "gpt-5",
      input: "Write a one-sentence bedtime story about a unicorn."
  });
    // Send response back
    res.json({ output: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
// Start the server on a local port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

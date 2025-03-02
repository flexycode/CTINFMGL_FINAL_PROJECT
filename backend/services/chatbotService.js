// Import required dependencies for environment configuration and OpenAI integration
const dotenv = require('dotenv');
const OpenAI = require('openai');
const verifyToken = require('../auth/userAuth');

// Configure environment variables from .env file
dotenv.config();

// Initialize OpenAI client with API key from environment variables
const client = new OpenAI({
  apiKey: process.env.CHAT_GPT_KEY, 
});

/**
 * Handles ChatGPT conversations with user input
 * @param {string} userInput - The user's message to send to ChatGPT
 * @param {function} callback - Callback function(err, response)
 * @returns {string} The AI's response to the user's input
 */
exports.chatGpt = async (userInput, callback) => {
  try {
    // Create a chat completion request with configured parameters
    const response = await client.chat.completions.create({
      // Use the latest GPT-3.5-turbo model for optimal performance
      model: 'gpt-3.5-turbo',
      // Define conversation context with system role and user input
      messages: [
        { 
          role: 'system', 
          content: 'You are a helpful assistant.' 
        },
        { 
          role: 'user', 
          content: userInput 
        }, 
      ],
      // Limit response length to 150 tokens for concise answers
      max_tokens: 150,
      // Set temperature to 0.7 for balanced creativity and coherence
      temperature: 0.7,
    });

    // Extract and trim the AI's response from the completion data
    return callback(null, response.choices[0].message.content.trim());
  } catch (err) {
    // Handle any errors that occur during the API call
    return callback(err);
  }
};

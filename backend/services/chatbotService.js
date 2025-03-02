
const dotenv = require('dotenv');
const OpenAI = require('openai');
const verifyToken = require('../auth/userAuth');

dotenv.config();

<<<<<<< HEAD
=======
// Initialize OpenAI client with API key from environment variables
>>>>>>> 6153a59 (Added comments to backend code for better readability)
const client = new OpenAI({
  apiKey: process.env.CHAT_GPT_KEY, 
});

<<<<<<< HEAD

=======
/**
 * Function to interact with OpenAI's ChatGPT API
 * @param {string} userInput - User's message/input
 * @param {function} callback - Callback function to handle the API response
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
exports.chatGpt =async  (userInput,callback) =>{
try{
    const response = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userInput }, 
        ],
        max_tokens: 150,
        temperature: 0.7,
      });
     return callback(null, response.choices[0].message.content.trim() );
    } catch (err) {
      return callback(err);
    }


}
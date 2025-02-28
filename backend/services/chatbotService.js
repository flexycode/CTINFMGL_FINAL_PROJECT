
const dotenv = require('dotenv');
const OpenAI = require('openai');
const verifyToken = require('../auth/userAuth');

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.CHAT_GPT_KEY, 
});


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
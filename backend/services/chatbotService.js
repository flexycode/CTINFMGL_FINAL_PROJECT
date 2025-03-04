const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.CHAT_GPT_KEY, 
});

exports.chatGpt = async (userInput) => {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userInput }, 
      ],
      max_tokens: 150,
      temperature: 0.7,
    });
    
    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error('ChatGPT API Error:', err);
    throw new Error('Failed to get response from ChatGPT');
  }
};
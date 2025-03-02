const chatBotService = require("../services/chatbotService");

/**
 * Handles chatbot interactions with OpenAI's GPT model
 * @param {Object} req - Express request object containing user input
 * @param {Object} res - Express response object for sending responses
 */
exports.chatgptController = (req, res) => {
  // Extract user input from request body, default to test message if none provided
  const userInput = req.body.input || "Say this is a test";

  // Call chatbot service to process user input through OpenAI's GPT model
  chatBotService.chatGpt(userInput, (err, result) => {
    // Handle service errors
    if (err) {
      res.status(500).send({ error: "Failed to get response from OpenAI" });
    }

    // Send successful response with GPT result
    res
      .status(200)
      .send({ message: result });
  });
};

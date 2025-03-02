const chatBotService = require("../services/chatbotService");

<<<<<<< HEAD
exports.chatgptController = (req, res) => {
  const userInput = req.body.input || "Say this is a test";

  chatBotService.chatGpt(userInput, (err, result) => {
    if (err) {
      res.status(500).send({ error: "Failed to get response from OpenAI" });
=======
/**
 * Controller to handle user input and interact with the chatbot service.
 * Sends user input to the chatbot and returns the generated response.
 */

exports.chatgptController = (req, res) => {
  const userInput = req.body.input || "Say this is a test";

   // Call the chatbot service with user input
  chatBotService.chatGpt(userInput, (err, result) => {
    if (err) {
      res.status(500).send({ error: "Failed to get response from OpenAI" }); // Handle service error
>>>>>>> 6153a59 (Added comments to backend code for better readability)
    }

    res
      .status(200)
<<<<<<< HEAD
      .send({message: result});
=======
      .send({message: result}); // Send chatbot response
>>>>>>> 6153a59 (Added comments to backend code for better readability)
  });
};

const chatBotService = require("../services/chatbotService");

exports.chatgptController = (req, res) => {
  const userInput = req.body.input || "Say this is a test";

  chatBotService.chatGpt(userInput, (err, result) => {
    if (err) {
      res.status(500).send({ error: "Failed to get response from OpenAI" });
    }

    res
      .status(200)
      .send({message: result});
  });
};

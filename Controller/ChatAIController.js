// Mock ChatAI controller (integrate OpenAI/Groq later)

exports.sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        // Mock AI response
        const aiResponse = `AI response to: ${message}. Tư vấn khám bệnh phù hợp.`;
        res.json({ response: aiResponse });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getChatHistory = async (req, res) => {
    res.json([{ user: 'Hi', ai: 'Hello!' }]);
};


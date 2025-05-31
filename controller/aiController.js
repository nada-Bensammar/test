const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

// Lister les modèles disponibles
exports.listModels = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/models?key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

// Générer du contenu à partir d'un prompt
exports.generateText = async (req, res) => {
  const { prompt, model } = req.body;

  if (!prompt || !model) {
    return res.status(400).json({ error: "prompt et model requis." });
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/models/${model}:generateText?key=${API_KEY}`,
      {
        prompt: { text: prompt }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

require("dotenv").config();
const axios = require("axios");
const products = require("../module/productSchema");

const API_KEY = process.env.GEMINI_API_KEY;

async function suggestProducts(userPrompt) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  const content = [
    {
      parts: [
        {
          text: `A user says: "${userPrompt}". Suggest what kind of electronics they are probably looking for. Just return keywords like laptop, gaming, phone, cheap, smartwatch, camera, etc.`,
        },
      ],
    },
  ];

  try {
    const res = await axios.post(endpoint, { contents: content }, {
      headers: { "Content-Type": "application/json" },
    });

    const reply = res.data.candidates[0].content.parts[0].text;
    const keywords = reply.toLowerCase().match(/\b(\w+)\b/g); // split into words

    // Match products based on keywords
    const recommended = products.filter((product) => {
      const haystack = `${product.name} ${product.specs} ${product.category}`.toLowerCase();
      return keywords.some((k) => haystack.includes(k));
    });

    return recommended;
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw new Error("Gemini API error");
  }
}

module.exports = { suggestProducts };

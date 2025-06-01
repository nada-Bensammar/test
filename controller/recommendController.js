const axios = require("axios");
const Product = require("../module/productSchema");

exports.getRecommendation = async (req, res, next) => {
  const { preferences } = req.body;

  try {
    // Fetch products from MongoDB
    const products = await Product.find().limit(20); // get some options to choose from

    // Prepare product list string for Gemini prompt (only essential info)
    const productList = products.map((p, idx) => 
      `${idx + 1}. ${p.name} - $${p.price} - ${p.description}`
    ).join("\n");

    // Gemini prompt to ask for top 2 product indexes and explanation
    const prompt = `
A customer wants electronics with these preferences: ${preferences}.
Here are some products in the store:
${productList}

Please reply ONLY in this JSON format:
{
  "topProducts": [1, 3],
  "explanation": "Explanation of why these products are recommended."
}
`;

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    // Extract Gemini text response
    const replyText = geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Parse Gemini JSON from replyText (robust parsing)
    let parsed;
    try {
      parsed = JSON.parse(replyText);
    } catch (err) {
      return res.status(500).json({ error: "Failed to parse Gemini response." });
    }

    // Map indexes to actual product objects
    const recommendedProducts = parsed.topProducts.map(i => products[i - 1]);

    res.status(200).json({
      recommendedProducts,
      explanation: parsed.explanation
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

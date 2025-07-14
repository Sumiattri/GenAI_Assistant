export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { messages } = req.body;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY3}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://gen-ai-assistant.vercel.app", // or your deployed domain
          "X-Title": "GenAI Assistant",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o",
          max_tokens: 500,
          messages,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text(); // Get raw error text
      console.error("Error from OpenRouter:", response.status, errorText);
      throw new Error(
        `OpenRouter API error: ${response.status} - ${errorText}`
      );
    }
    const data = await response.json();

    // ✅ Important: Respond to client!
    return res.status(200).json({ reply: data.choices[0].message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

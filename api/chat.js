export default async function handler(req, res) {
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
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openchat/openchat-3.5",
          messages,
        }),
      }
    );

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

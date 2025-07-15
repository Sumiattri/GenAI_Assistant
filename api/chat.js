// export default async function handler(req, res) {
//   // ✅ CORS headers
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Only POST allowed" });
//   }

//   const { messages } = req.body;

//   try {
//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY3}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": "https://gen-ai-assistant.vercel.app", // or your deployed domain
//           "X-Title": "GenAI Assistant",
//         },
//         body: JSON.stringify({
//           model: "openai/gpt-4o",
//           max_tokens: 400,
//           messages,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text(); // Get raw error text
//       console.error("Error from OpenRouter:", response.status, errorText);
//       throw new Error(
//         `OpenRouter API error: ${response.status} - ${errorText}`
//       );
//     }
//     const data = await response.json();

//     // ✅ Important: Respond to client!
//     return res.status(200).json({ reply: data.choices[0].message });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }

// export default async function handler(req, res) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const apiKey = process.env.GEMINI_API_KEY;

//   const userPrompt = req.body.prompt; // 👈 Send { prompt: "Your message" } from frontend

//   try {
//     const geminiResponse = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-goog-api-key": apiKey,
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: userPrompt,
//                 },
//               ],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await geminiResponse.json();
//     const reply =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

//     return res.status(200).json({ reply });
//   } catch (error) {
//     console.error("Gemini API error:", error);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// }

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // or specify domain
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // 👈 This is essential
  }

  // Your actual POST logic goes below
  if (req.method === "POST") {
    const apiKey = process.env.GEMINI_API_KEY;

    const userPrompt = `Give a short and beginner-friendly answer to: ${req.body.prompt}`;
    try {
      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: userPrompt,
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 500, // 👈 try 300–500 depending on your UI
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
            },
          }),
        }
      );

      const data = await geminiResponse.json();

      console.log("Gemini full response:", JSON.stringify(data, null, 2));
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      return res.status(200).json({ reply });
    } catch (error) {
      console.error("Gemini API error:", error);
      return res
        .status(500)
        .json({ error: "Something went wrong", details: error.message });
    }
  }

  // If method not allowed
  return res.status(405).end();
}

const express = require("express");

const app = express();

app.use(express.json());

app.post("/functions/extractUrls", (req, res) => {
  const { input } = req.body;

  if (typeof input !== "string") {
    return res.status(400).json({
      error: "input must be a string",
    });
  }

  // Match all HTTP/HTTPS URLs
  const regex = /https?:\/\/[^\s]+/gi;

  const matches = input.match(regex) || [];

  // Clean trailing punctuation
  const cleaned = matches.map((url) => url.replace(/[.,!?;:)\]]+$/, ""));

  // Remove duplicates
  const unique = [...new Set(cleaned)];

  res.json({
    output: {
      count: unique.length,
      urls: unique,
    },
  });
});

app.get("/functions/extractUrls", (req,res)=>{
    res.json({
        name: "extractUrls",
        description: "Extract all unique HTTP and HTTPS URLs from text.",

        input: {
            type: "string",
            description: "Text containing URLs to extract.",
            example: "Visit https://example.com and https://github.com"
        },

        output: {
            type: "array",
            description: "List of extracted URLs.",
            example: [
                "https://example.com",
                "https://github.com"
            ]
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

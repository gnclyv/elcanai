const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Sənin gizli açarın buradadır (İstifadəçi bunu görmür)
const API_KEY = "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";

app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "google/gemini-2.0-flash-001",
            messages: [{ role: "user", content: req.body.message }]
        }, {
            headers: { "Authorization": `Bearer ${API_KEY}` }
        });
        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Xəta baş verdi" });
    }
});

app.listen(3000, () => console.log("Server 3000-də işləyir..."));

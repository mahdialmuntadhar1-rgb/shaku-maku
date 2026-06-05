const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(express.static(__dirname));

app.post("/send", async (req, res) => {
  try {
    const { apiKey, phone, message } = req.body || {};

    if (!apiKey || !phone || !message) {
      return res.status(400).json({ success:false, error:"Missing apiKey, phone, or message" });
    }

    const r = await fetch("https://api.nabdaotp.com/api/v1/messages/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey
      },
      body: JSON.stringify({ phone, message })
    });

    const data = await r.json().catch(() => ({}));
    res.status(r.status).json({ success: r.ok, status: r.status, data });
  } catch (err) {
    res.status(500).json({ success:false, error:String(err.message || err) });
  }
});

app.listen(8787, () => {
  console.log("Nabda dashboard running:");
  console.log("http://localhost:8787");
});

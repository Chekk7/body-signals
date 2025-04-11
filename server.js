const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

const signalsFile = "signals.json";
let data = JSON.parse(fs.readFileSync(signalsFile));

app.get("/signals", (req, res) => {
  res.json(data.signals);
});

app.post("/signals", (req, res) => {
  const { part, observation, condition } = req.body;
  if (!part || !observation || !condition) return res.status(400).send("Part, observation, and condition required");
  const signal = { part, observation, condition, added: new Date().toISOString() };
  data.signals.push(signal);
  fs.writeFileSync(signalsFile, JSON.stringify(data, null, 2));
  res.json({ success: true, signal });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
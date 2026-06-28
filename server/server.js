const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const aiRoutes = require("./routes/aiRoutes");

console.log(
  "OpenRouter Key:",
  process.env.OPENROUTER_API_KEY ? "Loaded ✅" : "Missing ❌"
);

// IMPORTANT: Firebase import AFTER fix
let firebaseReady = false;
try {
  require("./firebase/firebaseAdmin");
  firebaseReady = true;
} catch (err) {
  console.warn("⚠️ Firebase disabled:", err.message);
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Last Minute Life Saver Backend Running");
});

app.use("/api", aiRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});
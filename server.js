const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

const adminUsername = "Akshat";
const adminPasswordHash = "$2b$10$f2oM0APu1orLIO6WALOWpusIfaJHQNTbF53E4s0nC7KnSgQQH008y"; // Replace with bcrypt hash

// Set up view engine
app.set("view engine", "ejs");

// Serve the admin login page
app.get("/", (req, res) => {
  res.render("admin-login");
});

// Handle login process
app.post("/login-process", async (req, res) => {
  console.log(req.body); // Debugging log
  const { username, password } = req.body;

  if (username !== adminUsername) {
    return res.status(401).send("Invalid username");
  }

  const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
  if (!isPasswordValid) {
    return res.status(401).send("Invalid password");
  }

  res.redirect("/dashboard");
});

// Dashboard route
app.get("/dashboard", (req, res) => {
  res.send("<h1>Welcome to the Dashboard!</h1>");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

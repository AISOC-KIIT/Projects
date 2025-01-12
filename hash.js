const bcrypt = require("bcrypt");

(async () => {
  const password = "your-admin-password"; // Replace with your desired admin password
  const saltRounds = 10;

  const hash = await bcrypt.hash(password, saltRounds);
  console.log("Hashed Password:", hash);
})();

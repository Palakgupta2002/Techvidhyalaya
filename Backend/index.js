const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
var emaill;
const server = express();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("Connected to MongoDB");
}

// Define schema first
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  college: String,
  email: String,
  phone: String,
  image: [
    {
      title: String, // Add a title property for the image
      data: Buffer,
      contentType: String,
    },
  ],
});

// Create model using schema
const User = mongoose.model("user", userSchema);

//This is for to connect a two localhost to each other like gateway
server.use(cors());
server.use(bodyParser.json());
server.get("/", (res, req) => {
  req.send("hello");
});
const upload = multer();
//This is for Signup
server.post("/Signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      console.log("User exists");
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User();
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.college = req.body.college;
    newUser.email = req.body.email;
    newUser.phone = req.body.phone;

    // Save the new user to the database
    const doc = await newUser.save();

    // Return a success response
    console.log("Successfully registered");
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error inserting user data:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});


//This is for Login
// This is for Login
server.post("/Login", async (req, res) => {
  try {
    const { lemail, lpassword } = req.body;
    emaill = req.body.lemail;

    // Find the user with the provided username
    const user = await User.findOne({ email: lemail });

    // Check if the user exists and the password matches
    if (user && user.password === lpassword) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
//This is for to profiles
server.get("/Profiles", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

server.get("/Profile", async (req, res) => {
  console.log(emaill);
  try {
    const user = await User.findOne({ email: emaill });
    if (user) {
      res.status(200).json(user);
      
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});



server.use(express.json());

// ... your existing routes ...

server.post("/CreatePost", upload.single("image"), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.file) {
      const imageObject = {
        title: req.body.title, // Include the title in the image object
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };

      // Push the new image object to the image array
      user.image.push(imageObject);

      // Save the user document
      await user.save();

      return res.status(200).json({ message: "Post created successfully" });
    } else {
      return res.status(400).json({ error: "No image file received" });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});




server.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});

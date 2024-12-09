const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios'); // Import axios for captcha verification
const User = require('./Models/userModel');
const Event = require('./Models/eventModel');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { configDotenv } = require('dotenv');

const dbConnect = require("./db")
const adminRouter = require("./router/adminRouter")
const userRouter = require("./router/userRouter")
const app = express();
const cookieParser = require("cookie-parser");
const { getValidUserFromToken } = require('./utils');

// mongoose.connect('mongodb://127.0.0.1:27017/uevents');
dbConnect()

configDotenv()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser())

const TURNSTILE_SECRET_KEY = '0x4AAAAAAAjqz9FYZYQjzI7o2lALBRu5pe4'; // Replace with your secret key
const JWT_SECRET_KEY = "LKjsdfkjlJ$LKjq34kj2jkJLKJLKFDJSL";


app.use("/admin", adminRouter)
app.use("/", userRouter)
// Function to verify Turnstile CAPTCHA token
const verifyTurnstile = async (token) => {
  try {
    const response = await axios.post(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      `secret=${TURNSTILE_SECRET_KEY}&response=${token}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.success; // Return true if verification is successful
  } catch (error) {
    console.error('Error verifying Turnstile CAPTCHA:', error);
    return false; // Return false if verification fails
  }
};

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(4003, () => {
  console.log('Server started on port 4003');
});

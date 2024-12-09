const express = require("express")
const mongoose = require('mongoose');
const User = require('../Models/userModel');
const Event = require('../Models/eventModel');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { configDotenv } = require('dotenv');
const { getValidUserFromToken } = require("../utils");
configDotenv()
const router = new express.Router()


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("username: " + username)
    console.log("password: " + password)
    const user = await User.findOne({ username: username });
    console.log("User: ", user);

    if (!user) {
        return res.status(404).send({ msg: 'User does not exist' });
    }
    
    const result = await bcrypt.compare(password, user.password)
    if (!result) {
        res.status(401).send({ msg: 'User exists but password is incorrect' });
    }

    const token = await jwt.sign({ username: username }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" })

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: false
    })

    return res.status(200).send({ msg: 'Login Successful', username: user.username })

    //   if (user.password === password) {
    //     res.status(200).send({ msg: 'User exists and password is correct' });
    //   } else {
    //     res.status(401).send({ msg: 'User exists but password is incorrect' });
    //   }
    // } else {

    // }
});

router.get("/logout", async (req, res) => {
    res.clearCookie("token")
    res.json({ msg: "Logged out" })
})

async function authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ msg: "Invalid request 1" })
    }
    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const username = decodedData.username
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(401).json({ msg: "Invalid request 2" })
        }
        req.username = user.username
        req.userId = user._id
        next()
    } catch (error) {
        return res.status(401).json({ msg: "Invalid request 3" })
    }

}

router.get("/verify-user", authenticate, async (req, res) => {
    res.json({ username: req.username })
})

router.post('/signup', async (req, res) => {
    const { username, password, email, phoneNumber, rollNumber, year, name, department } = req.body;
    const user = await User.findOne({ name: username });
    if (user) {
        return res.status(409).send({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await User.create({
        name, username, password: hashedPassword, email, phoneNumber, rollNumber, year, department
    })
    if (!savedUser) {
        return res.status(401).send({ msg: 'Error in Registration' });
    }
    
    res.status(201).send({ msg: 'User created' });
});


router.get("/events", async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Get past events (before today)
        const pastEvents = await Event.find({
            eventDate: { $lt: today }
        }).sort({ eventDate: -1 });  // Sort by date descending

        // Get upcoming events (today and future)
        const upcomingEvents = await Event.find({
            eventDate: { $gte: today }
        }).sort({ eventDate: 1 });  // Sort by date ascending

        res.status(200).json({
            success: true,
            data: {
                pastEvents,
                upcomingEvents
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching events",
            error: error.message
        });
    }
});


router.get("/event/:eventId", async (req, res) => {
    console.log("Getting event details")
    try {
        const event = await Event.findOne({ _id: req.params.eventId });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        let isRegistered = false; // for non-logged in users
        if (req?.cookies?.token) {
            const token = req.cookies.token
            const user = await getValidUserFromToken(token)
            if (!user) {
                return res.status(401).json({ msg: "Invalid request 1" })
            }
            isRegistered = user ? event.users?.includes(user._id) : false;
        }
        // Check if user is registered



        res.status(200).json({
            success: true,
            data: { ...event.toObject(), isRegistered }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching event details",
            error: error.message
        });
    }
});

// router.post('/register-event', async (req, res) => {
//   const {
//     eventName,
//     name,
//     email,
//     rollNumber,
//     department,
//     year,
//     phoneNumber,
//     captchaToken, // The token sent from the frontend
//   } = req.body;

//   // Verify Turnstile CAPTCHA
//   // const isCaptchaValid = await verifyTurnstile(captchaToken);
//   const secret = "6Lepo4kqAAAAACmUMYNcBR09bXcUR3BDJH7bmEhC"

//   const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`

//   console.log("url: " + url)

//   const response = await axios.post(url)

//   console.log("Response: ", response)
//   if (!response.data.success) {
//     console.log(JSON.stringify(response.data))
//     return res.status(200).json({ msg: "Invalid request" })
//   }

//   try {
//     // If CAPTCHA is valid, create event registration
//     await Event.create({
//       eventName,
//       user: {
//         name,
//         email,
//         rollNumber,
//         department,
//         year,
//         phoneNumber,
//       },
//     });

//     res.status(201).send({ msg: 'Registration successful' });
//   } catch (error) {
//     console.log("Error: ", error)
//     res.status(500).send({ msg: 'Registration failed', error });
//   }
// });


// Add this to your backend routes


router.post("/event/register/:eventId", authenticate, async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User token is required"
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Check if user is already registered
        if (event.users && event.users.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "You are already registered for this event"
            });
        }

        // Add user to the event's users array
        if (!event.users) {
            event.users = [];
        }

        event.users.push(userId);
        await event.save();

        res.status(200).json({
            success: true,
            message: "Successfully registered for the event",
            data: event
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error registering for event",
            error: error.message
        });
    }
});


module.exports = router
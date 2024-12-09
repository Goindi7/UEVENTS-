const Admin = require("../Models/adminModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Event = require("../Models/eventModel")
const { v2 } = require('cloudinary')
const { configDotenv } = require("dotenv")
const User = require("../Models/userModel")
const fs = require("fs")
configDotenv()



console.log("KEY: ", process.env.CLOUDINARY_API_KEY)

v2.config({
    cloud_name: 'dagwexpmv',
    api_key: '322131122443161',
    api_secret: process.env.CLOUDINARY_API_KEY // Click 'View API Keys' above to copy your API secret
});


// const ADMIN_JWT_SECRET = "KLJSJK@#&*(#@&$SDDFLKSDJFSDF"



const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log("username: " + username)
    console.log("password: " + password)
    const admin = await Admin.findOne({ username: username });
    console.log("Admin: ", admin);

    if (!admin) {
        return res.status(404).send({ msg: 'User does not exist' });
    }

    const result = await bcrypt.compare(password, admin.password)
    if (!result) {
        res.status(401).send({ msg: 'Invalid credentials' });
    }

    const token = await jwt.sign({ username: username }, process.env.ADMIN_JWT_SECRET, { expiresIn: "24h" })

    res.cookie("adminToken", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: false
    })

    return res.status(200).send({ msg: 'Login Successful', username: admin.username })

}


const adminRegister = async (req, res) => {
    const { username, password, name } = req.body;
    const admin = await Admin.findOne({ username: username });
    if (admin) {
        return res.status(500).send({ msg: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const savedAdmin = await Admin.create({
        name, username, password: hashedPassword
    })
    if (!savedAdmin) {
        return res.status(401).send({ msg: 'Error in Admin Registration' });
    }
    res.status(201).send({ msg: 'Admin created' });
}

const adminVerify = async (req, res) => {
    res.status(200).json({ username: req.username })
}


const adminLogout = async (req, res) => {
    res.clearCookie("adminToken")
    res.json({ msg: "Logged out" })

}

const adminEventDelete = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findByIdAndDelete(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting event",
            error: error.message
        });
    }
}



const adminAddEvent = async (req, res) => {
    try {
        const { title, desc, organizer, eventDate } = req.body;
        // const posterPath = req.file ? `/uploads/${req.file.filename}` : '';
        console.log("file : ", req.file.path)
        const result = await v2.uploader.upload(req.file.path)
        console.log("result: ", result)
        const poster = result.secure_url || "https://res.cloudinary.com/dagwexpmv/image/upload/v1732764848/ocwf8my8zxek4cdkqiwr.png"
        const newEvent = new Event({
            title,
            desc,
            organizer,
            eventDate,
            poster: poster
        });

        await newEvent.save();

        res.status(201).json({
            success: true,
            message: "Event added successfully",
            data: newEvent
        });

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({
            success: false,
            message: "Error adding event",
            error: error.message
        });
    }
}


const adminViewEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        console.log("Event: ", eventId)
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }
        console.log("Event: ", event)
        res.status(200).json({
            success: true,
            event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in fetching Event",
            error: error.message
        });
    }
}

const adminEditEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        console.log("Event: ", eventId)
        const { title, eventDate, desc } = req.body;

        // Initialize update object with non-image data
        const updateFields = {
            title,
            eventDate,
            desc
        };

        // Only handle image upload if a new file is provided
        if (req.file) {
            try {
                const result = await v2.uploader.upload(req.file.path);
                updateFields.poster = result.secure_url;
                // Remove the temporary file after upload
                fs.unlinkSync(req.file.path);
            } catch (uploadError) {
                console.error('Error uploading image:', uploadError);
                return res.status(400).json({
                    success: false,
                    message: 'Error uploading image'
                });
            }
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $set: updateFields }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.json({
            success: true,
            message: 'Event updated successfully',
            event: updatedEvent
        });

    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating event'
        });
    }
};


const adminViewAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({
            success: true,
            data: events
        });
    } catch (error) {
        console.error('Error getting events:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching events'
        });
    }
}


const adminGetAllUsersEvents = async (req, res) => {
    try {
        const events = await Event.find().select('title eventDate');
        res.status(200).json({
            success: true,
            events: events
        });

    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching event registrations'
        });
    }
}

const adminGetEventUsers = async (req, res) => {
    try {
        console.log("Getting registered users")
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }
        const userDetails = await User.find({ _id: { $in: event.users } });
        console.log("userdetais: ", JSON.stringify(userDetails))
        res.status(200).json({
            success: true,
            data: {
                event: {
                    title: event.title,
                    eventDate: event.eventDate,
                    desc: event.desc,
                    _id: event._id
                },
                registeredUsers: userDetails.map(user => ({
                    name: user.name,
                    department: user.department,
                    mobileNumber: user.mobileNumber,
                    email: user.email
                }))
            }
        });

    } catch (error) {
        console.error('Error getting event details:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching event details'
        });
    }
}

// const adminViewRegistrations = async (req, res) => {
//     try {
//         // First, get all events
//         const events = await Event.find();

//         // Create an object to store registrations for each event
//         const registrationsByEvent = {};

//         // For each event, fetch user details
//         for (const event of events) {
//             // Only process events that have registered users
//             if (event.users && event.users.length > 0) {
//                 // Get user details for each user ID in the event
//                 const userDetails = await User.find({
//                     _id: { $in: event.users }
//                 });

//                 // Store user details for this event
//                 registrationsByEvent[event._id] = userDetails.map(user => ({
//                     name: user.name,
//                     department: user.department,
//                     mobileNumber: user.mobileNumber,
//                     email: user.email
//                 }));
//             }
//         }

//         res.status(200).json({
//             success: true,
//             data: registrationsByEvent
//         });

//     } catch (error) {
//         console.log('Error fetching registrations:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching registrations'
//         });
//     }
// }
module.exports = {
    adminLogin,
    adminRegister,
    adminVerify,
    adminLogout,
    adminEventDelete,
    adminAddEvent,
    adminViewEvent,
    adminEditEvent,
    adminViewAllEvents,
    adminGetAllUsersEvents,
    adminGetEventUsers
}
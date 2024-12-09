const express = require("express")
const { adminLogin, adminRegister, adminVerify, adminLogout,
    adminAddEvent, adminEventDelete, adminViewEvent, adminEditEvent,
    adminViewRegistrations, adminViewAllEvents, adminGetAllUsersEvents, adminGetEventUsers } = require("../controllers/adminControllers")
const { authenticateAdmin } = require("../utils")
const multer = require('multer');

const multerObj = multer({
    storage: multer.diskStorage({})
})

const router = new express.Router()

router.post("/login", adminLogin)
router.post("/admin-register", adminRegister) // Will disable this route when APP is LIVE
router.get("/verify", authenticateAdmin, adminVerify)
router.get("/logout", adminLogout)
router.post("/add-event", authenticateAdmin, multerObj.single('poster'), adminAddEvent)
router.delete("/event/:eventId", authenticateAdmin, adminEventDelete)
router.get("/event/:eventId", authenticateAdmin, adminViewEvent)
router.put("/event/:eventId", authenticateAdmin, multerObj.single('poster'), adminEditEvent)
// router.get("/events/registrations", authenticateAdmin, adminViewRegistrations)
router.get("/events/", authenticateAdmin, adminViewAllEvents)
router.get("/events-with-users", authenticateAdmin, adminGetAllUsersEvents)
router.get("/event/registered/:eventId", authenticateAdmin, adminGetEventUsers)

module.exports = router



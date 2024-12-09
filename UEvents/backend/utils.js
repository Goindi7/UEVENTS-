const Admin = require("./Models/adminModel");
const User = require("./Models/userModel");
const jwt = require("jsonwebtoken")

async function getValidUserFromToken(token) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findOne({ username: data.username })
    return user
  } catch (error) {
    return false
  }
}


async function authenticateAdmin(req, res, next) {
  const token = req.cookies.adminToken;
  if (!token) {
    return res.status(401).json({ msg: "Invalid request 0" })
  }
  try {
    const decodedData = jwt.verify(token, process.env.ADMIN_JWT_SECRET)
    const username = decodedData.username
    const admin = await Admin.findOne({ username: username })
    if (!admin) {
      return res.status(401).json({ msg: "Invalid request 1" })
    }
    req.username = admin.username
    req.adminId = admin._id
    next()
  } catch (error) {
    console.log("Error: ", error)
    return res.status(401).json({ msg: "Invalid request 3" })
  }

}

module.exports = { getValidUserFromToken, authenticateAdmin }
const { Op } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

require('./models/modelManager')

const app = express();
app.use(bodyParser.json());

const User = require('./models/User')

const jwt = require("jsonwebtoken");

const { registerUserSchema, loginUserSchema } = require('./validators/userValidationSchema')

const baseUrl = "/api/v1"


const signToken = (user) => {
    return jwt.sign(
      user,
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
  }

app.post(`${baseUrl}/user`, async (req, res) => {

    try {
        const { body } = req;
        const data = registerUserSchema.validateSync(body);

        const user = await User.create(data);

        res.status(200).json({ "status" : "Account successfully created", status_code : 200, user_id: user.userId });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(403).json({ status: 'error', message: "User already exists" });
        } else {
            res.status(400).json({ errors: err.message });
        }
    }
})

app.post(`${baseUrl}/login`, async (req, res) => {
    try {
      // Validate username and password using loginUserSchema
      const { username, password } = loginUserSchema.validateSync(req.body);
  
      const user = await User.findOne({
        where: {
            username: username 
        }
      });
  
      // If user doesn't exist, return error response
      if (user === null) {
        return res.status(401).json({ message: "error", error: "No such User exists" });
      }
  
      // Check if password is valid
      if (user.validPassword(password)) {
        // If valid, generate token and send user details
        const token = signToken({ username: user.username, userId: user.userId, admin: user.isAdmin });
        return res.status(200).json({ "status":"Login Succesful", "status_code": 200, "access_token" : token, user_id: user.userId });
      }
  
      // If password is incorrect, return error response
      return res.status(403).json({ message: "error", error: "Incorrect credentials" });
    } catch (err) {
      // Handle validation and other errors
      return res.status(401).json({ message: err.message });
    }
  });




app.listen(3000, () => console.log('server started'));
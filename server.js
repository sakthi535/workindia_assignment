const { Op } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const User = require('./models/User')

const jwt = require("jsonwebtoken");

const {registerUserSchema} = require('./validators/userValidationSchema')

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
        const token = signToken({ username: data.username, userId: user.userId, isAdmin: user.isAdmin });

        res.status(201).json({ token, fullName: user.fullName, username: user.username });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(403).json({ status: 'error', message: "User already exists" });
        } else {
            res.status(400).json({ errors: err.message });
        }
    }


})

app.listen(3000, () => console.log('server started'));
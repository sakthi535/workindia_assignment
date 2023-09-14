const { Op } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

require('./models/modelManager')

const app = express();
app.use(bodyParser.json());

const User = require('./models/User')
const Train = require('./models/Train')
const Station = require('./models/Station')

const admin = require('./Auth/admin')
const auth = require('./Auth/auth')

const jwt = require("jsonwebtoken");

const { registerUserSchema, loginUserSchema } = require('./validators/userValidationSchema')
const { createTrainSchema } = require('./validators/trainValidationSchema');
const SeatBookingModel = require('./models/SeatBooking');
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


app.post(`${baseUrl}/station`, async (req, res) => {
    try {
      const { name } = req.body;
  
      const user = await Station.create({name : name});

      return res.status(201).json({ message: "ok"});
    } catch (err) {
      // Handle validation and other errors
      return res.status(401).json({ message: err.message });
    }
  });


app.post(`${baseUrl}/trains/create`,admin, async (req, res) => {
    try {
      // Validate username and password using loginUserSchema
      const data = createTrainSchema.validateSync(req.body);
  
      const arrival_time = req.body[("arrival_time_at_source")]
      const arrival_time_dest = req.body[("arrival_time_at_destination")]

      const source = await Station.findOne({
        where: {
            name: data.source 
        }
      });
  
      const destination = await Station.findOne({
        where: {
            name: data.destination 
        }
      });

      // If user doesn't exist, return error response
      if (source == null || destination == null) {
        return res.status(401).json({ message: "error", error: "No such Station exists" });
      }
  
      const train = await Train.create({
        name : data.train_name,
        source : source.stationId,
        destination : destination.stationId,
        max_capacity : data.seat_capacity,
        arrival_time_at_source : arrival_time,
        arrival_time_at_destination : arrival_time_dest
      })
  
      return res.status(201).json({ message: "Train added succesfully", train_id: train.trainId });
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  });

  app.post(`${baseUrl}/trains/:trainId/book`,auth, async (req, res) => {
    try {
      // Validate username and password using loginUserSchema
      const {userId, no_of_seats} = (req.body);
      const { trainId } = req.params;

      await SeatBookingModel.create({
        trainId : trainId,
        userId : userId
      })

      return res.status(201).json({ message: "Seats added succesfully", train_id: train.trainId });
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  });





app.listen(3000, () => console.log('server started'));
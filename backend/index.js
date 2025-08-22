const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./db');
const User = require('./models/User');
const Booking = require('./models/Booking');
const Vehicles = require('./models/Vehicles');
const VehicleType = require('./models/VehicleType');
const { Op } = require("sequelize");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes 
// after wheel selection disply types of cars
app.get('/vehicle-types', async (req, res) => {
  try {
    const wheels = parseInt(req.query.wheels);

    if (![2, 4].includes(wheels)) {
      return res.status(400).json({ error: "invalid whhels" });
    }

    const types = await VehicleType.findAll({ where: { wheels } });
    res.json(types);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'server error' });
  }

})

//based on car type , show car models
app.get('/vehicles', async (req, res) => {
  try {
    const typeId = parseInt(req.query.typeId);

    if (isNaN(typeId)) {
      return res.status(400).json({ error: "vehicle type id is required" });
    }

    const vehicles = await Vehicles.findAll({
      where: { VTypeID: typeId }
    })
    res.json(vehicles);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" })

  }
})

app.post('/booking', async (req, res) => {
  try {
    const { fname, lname, vehicleId, w, sdate, edate } = req.body;

    // check if all fields are complete
    if (!fname || !lname || !w || !sdate || !edate) {
      return res.status(400).json({ error: "all fields are not complete" })
    }

    // check if uesr exits , else create new user 
    let user = await User.findOne({
      where: { first_name: fname, last_name: lname }
    });

    // If not, create new user
    if (!user) {
      console.log("new User")
      user = await User.create({
        first_name: fname,
        last_name: lname
      });
    }

    // check for dates and same vehicle
    const matchingDate = await Booking.findOne({
      where: {
        VID: vehicleId,
        [Op.or]: [
          {
            start_date: { [Op.between]: [sdate, edate] }
          },
          {
            end_date: { [Op.between]: [sdate, edate] }
          }
        ]
      }
    });

    if (matchingDate) {
      return res.status(400).json({ error: "Vehicle already booked" });
    }

    // if everything is fine , then book the vehicle
    const booking = await Booking.create({
      userID: user.userID,
      VID: vehicleId,
      start_date: sdate,
      end_date: edate
    });
    res.json({
      message: "Booking confirmed!",
      booking: {
        bookingId: booking.bookingID,
        user: { fname: user.first_name, lname: user.last_name },
        vehicleId: vehicleId,
        startDate: sdate,
        endDate: edate
      }
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }

})

app.get('/', (req, res) => res.send("Backend is running"));

app.listen(5000, () => console.log("Server is running"));
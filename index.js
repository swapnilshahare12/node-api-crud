const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
require('./db/conn');
const employee = require('./models/employees.js');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



/* -------- making request to main url for employee registration form ------- */

app.get('/', async (req, res) => {
  res.sendFile('./public/index.html');
});



/* ---- making post request to store employee data into mongoDB database ---- */

app.post('/register-employee', async (req, res) => {
  try {
    const {
      fullName,
      jobTitle,
      PhoneNumber,
      email,
      address,
      city,
      state,
      primaryEmergencyContact,
      primaryEmergencyPhoneNumber,
      relationship1,
      secondaryEmergencyContact,
      secondaryEmergencyPhoneNumber,
      relationship2,
    } = req.body;
    const registeredData = await employee.findOne({ email });
    if (!registeredData) {
      newUser = new employee({
        fullName,
        jobTitle,
        PhoneNumber,
        email,
        address,
        city,
        state,
        primaryEmergencyContactDetails: [{
              primaryEmergencyContact,
              primaryEmergencyPhoneNumber,
              relationship1,
          }],
          secondaryEmergencyContactDetails: [{
              secondaryEmergencyContact,
              secondaryEmergencyPhoneNumber,
              relationship2,
          }]
      });
        const registered = await newUser.save();
        res.send(registered)
    } else if (registeredData) {
      console.log('email is already in use');
    } else {
      console.error(err);
      res.status(500).send('server error');
    }
  } catch (e) {
    res.status(400).send(e);
  }
});




/* --------------- making get request to get employee details --------------- */

app.get('/employee-details/:id', async (req, res) => {
  try {
    const getData = await employee.find({ _id: req.params.id });
    res.send(getData);
  } catch (err) {
    res.status(400).send(err);
  }
});




/* ------------- making patch request to update employee details ------------ */

app.patch('/employee-details/:id', async (req, res) => {
  try {
    const getData = await employee.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(getData);
  } catch (err) {
    res.status(500).send(err);
  }
});






/* ------------ making delete request to delete employee details ------------ */

app.delete('/employee-details/:id', async (req, res) => {
  try {
    const getData = await employee.findByIdAndDelete(req.params.id);
    res.send(getData);
  } catch (err) {
    res.status(500).send(err);
  }
});



app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});


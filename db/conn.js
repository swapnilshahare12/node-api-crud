const mongoose = require('mongoose')
mongoose
  .connect('mongodb://127.0.0.1:27017/employeesdata')
  .then(() => console.log('connection succesfull'))
  .catch((err) => console.log(err));

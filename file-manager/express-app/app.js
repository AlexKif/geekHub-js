const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const cors = require('cors');
const auth = require('./routes/auth');

app.use(cors({origin: "http://localhost:3000"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);

(async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:qweqweqwe@cluster0.rqeqe.mongodb.net/file_manager', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });
    app.listen(port, () => {
      console.log(`Server has been startedd`)
    })
  } catch (err) {
    console.error(err)
  }
})();

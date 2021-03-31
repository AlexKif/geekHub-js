const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const cors = require('cors');
const auth = require('./routes/auth');
const fileManagerRoutes = require('./routes/file-manager');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('public'));
app.use(cors({origin: "http://localhost:3000"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);
app.use(fileManagerRoutes);

(async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:qweqweqwe@cluster0.rqeqe.mongodb.net/file_manager', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });
    app.listen(port, () => {
      console.log(`Server has been started`)
    })
  } catch (err) {
    console.error(err)
  }
})();

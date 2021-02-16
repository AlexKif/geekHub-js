const mongoose = require('mongoose')
const todoRoutes = require('./routes/todos');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const port = 8080

const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(todoRoutes)


async function start() {
  try {
    await mongoose.connect('mongodb+srv://admin:qweqweqwe@cluster0.jn9kq.mongodb.net/todos', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    })
    app.listen(port, () => {
      console.log(`Server has been started`)
    })
  } catch (err) {
    console.log(err)
  }
}

app.use(
  require('express').static(
    resolve(__dirname, 'public')
  )
);

start();
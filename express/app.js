const mongoose = require('mongoose')
const todoRoutes = require('./routes/todos');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const port = 8080

const express = require('express')
const app = express()
const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*'
  }
})
httpServer.listen(8000)

const cors = require('cors')

app.use(cors())
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('io', io)
app.use(todoRoutes)

app.use(
  require('express').static(
    resolve(__dirname, 'public')
  )
);

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
start()

io.on('connection', (client) => {
  console.log('New user connection')
});
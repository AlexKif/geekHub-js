const {Router} = require('express')
const Todo = require('../models/Todo');
const router = Router();

router.get('/todo/get_all', async (req, res) => {
  Todo.find({}, await function (err, todos) {
    res.json(todos);
  })
})

router.post('/todo/add', async (req, res) => {
  const todo = new Todo({
    isDone: req.body.isDone,
    value: req.body.value
  })

  await todo.save();
  res.json({isDone: req.body.isDone, value: req.body.value})
})

router.post('/todo/complete', async (req, res) => {
  Todo.updateMany({}, {isDone: false}, { multi: true })

  // Todo.find({}, await function (err, todos) {
  //   const mapTodos = todos.map(item => {
  //     return {
  //       ...item,
  //       isDone: req.body.status
  //     }
  //   })
  //
  //   res.json(mapTodos);
  // })
})

router.post('/todo/complete/:id', async (req, res) => {
  const todo = new Todo({
    isDone: req.body.isDone,
    value: req.body.value
  })



  await todo.save();
})


module.exports = router
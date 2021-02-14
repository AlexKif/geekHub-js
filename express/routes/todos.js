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
  await Todo.updateMany({}, {isDone: req.body.status})
  Todo.find({}, await function (err, todos) {
    res.json(todos);
  })
})

router.post('/todo/complete/:id', async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndUpdate(id, {isDone: req.body.status})
  const doc = await Todo.findById(id)
  res.json(doc);

})


module.exports = router
const {Router} = require('express')
const Todo = require('../models/Todo');
const router = Router();

router.get('/todo', async (req, res) => {
  if (req.query.filter === 'active') {
    return Todo.find({isDone: false}, await function (err, todos) {
      res.json(todos);
    });
  }
  if (req.query.filter === 'completed') {
    return Todo.find({isDone: true}, await function (err, todos) {
      res.json(todos);
    });
  }
  return Todo.find({}, await function (err, todos) {
    res.json(todos);
  });
})

router.post('/todo', async (req, res) => {
  const todo = new Todo({
    isDone: req.body.isDone,
    value: req.body.value
  })

  await todo.save();
  res.json({isDone: req.body.isDone, value: req.body.value})
})

router.put('/todo/complete', async (req, res) => {
  await Todo.updateMany({}, {isDone: req.body.status})
  Todo.find({}, await function (err, todos) {
    res.json(todos);
  })
})

router.put('/todo/complete/:id', async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndUpdate(id, {isDone: req.body.status})
  const doc = await Todo.findById(id)
  res.json(doc);
})

router.post('/todo/complete/clear', async (req, res) => {
    await Todo.deleteMany({isDone: true}, {},(err, result) => {
    if (err) {
      return res.json({error: err})
    }
    return res.json(result)
  })
})

router.delete('/todo/delete/:id', async (req, res) => {
  const id = req.params.id;
  await Todo.remove({_id: id}, (err, result) => {
    if (err) {
      return res.json({error: err})
    }
    return res.json(result);
  })
})

module.exports = router
const {Router} = require('express')
const Todo = require('../models/Todo');
const router = Router();

router.get('/todo', async (req, res) => {
  const {filter} = req.query;
  const where = filter === 'active' ? {isDone: false} : filter === 'completed' ? {isDone: true} : {};
  Todo.find(where, await function (err, todos) {
    if (err) {
      return res.json(err)
    }
    res.json(todos);
  });
})

router.get('/todo/:id', async (req, res) => {
  const id = req.params.id;
  Todo.findById(id, await function (err, todos) {
    if (err) {
      return res.json(err)
    }
    res.json(todos);
  });
})

router.put('/todo/edit/:id', async (req, res) => {
  const id = req.params.id;
  const io = req.app.get('io');
  await Todo.findByIdAndUpdate(id, {value: req.body.value}, function(err, user) {
    if (err) {
      return res.json(err);
    }
  })
  const doc = await Todo.findById(id)
  res.json(doc);
  io.emit('editTodo', doc);
})

router.post('/todo', async (req, res) => {
  const todo = new Todo({
    isDone: req.body.isDone,
    value: req.body.value
  })
  const io = req.app.get('io');
  await todo.save((err, room) => {
    if (err) {
      return res.json(err)
    }
    res.json({isDone: req.body.isDone, value: req.body.value, ['_id']: room.id})
    io.emit('newTodoAdded', {isDone: req.body.isDone, value: req.body.value, ['_id']: room.id});
  });
})

router.put('/todo/complete', async (req, res) => {
  const io = req.app.get('io');
  await Todo.updateMany({}, {isDone: req.body.status})
  Todo.find({}, await function (err, todos) {
    if (err) {
      return res.json(err)
    }
    res.json(todos);
    io.emit('allTodoComplete', todos);
  })
})

router.put('/todo/complete/:id', async (req, res) => {
  const id = req.params.id;
  const io = req.app.get('io');
  await Todo.findByIdAndUpdate(id, {isDone: req.body.status}, function (err) {
    if (err) {
      return res.json(err)
    }
  })
  const doc = await Todo.findById(id)
  res.json(doc);
  io.emit('singleTodoComplete', req.body.status, doc);
})

router.post('/todo/complete/clear', async (req, res) => {
  const io = req.app.get('io');
  await Todo.deleteMany({isDone: true}, {},(err, result) => {
    if (err) {
      return res.json({error: err})
    }
    return Todo.find({}, function (err, todos) {
      res.json(todos);
      io.emit('deleteCompleted', todos);
    });
  })
})

router.delete('/todo/delete/:id', async (req, res) => {
  const id = req.params.id;
  const io = req.app.get('io');

  await Todo.remove({_id: id}, (err, result) => {
    if (err) {
      return res.json({error: err})
    }
    res.json(result);
    io.emit('deletedTodo', id);
  })
})

module.exports = router
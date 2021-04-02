const {Router} = require('express')
const Todo = require('../models/Todo');
const router = Router();

router.get('/todo', async (req, res) => {
  const {filter} = req.query;
  const where = filter === 'active' ? {isDone: false} : filter === 'completed' ? {isDone: true} : {};

  Todo.find(where)
    .then((doc) => {
      return res.json(doc.map(item => {
        return item['_doc'];
      }))
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/todo/:id', async (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .then(doc => {
      res.json(doc['_doc']);
    })
    .catch((err) => {
      res.json(err)
    })
})

router.put('/todo/edit/:id', async (req, res) => {
  const id = req.params.id;
  const io = req.app.get('io');

  Todo.findOneAndUpdate({_id: id}, {value: req.body.value})
    .then((doc) => {
      res.json({...doc['_doc'], value: req.body.value});
      io.emit('editTodo', {...doc['_doc'], value: req.body.value});
    })
    .catch((err) => {
      res.json(err);
    })
})

router.post('/todo', async (req, res) => {
  const todo = new Todo({
    isDone: req.body.isDone,
    value: req.body.value
  })
  const io = req.app.get('io');

  todo.save()
    .then((doc) => {
      res.json(doc['_doc']);
      io.emit('newTodoAdded', doc['_doc']);
    })
    .catch((err) => {
      res.json(err);
    })
})

router.put('/todo/complete', async (req, res) => {
  const io = req.app.get('io');

  Todo.updateMany({}, {isDone: req.body.status})
    .then((doc) => {
      Todo.find({})
        .then((doc) => {
          res.json(doc);
          io.emit('allTodoComplete', doc);
        })
        .catch((err) => {
          res.json(err);
        })
    })
    .catch((err) => {
      res.json(err);
    })
})

router.put('/todo/complete/:id', async (req, res) => {
  const id = req.params.id;
  const io = req.app.get('io');

  Todo.findByIdAndUpdate(id, {isDone: req.body.status})
    .then((doc) => {
      res.json(doc['_doc']);
      io.emit('singleTodoComplete', req.body.status, doc['_doc']);
    })
    .catch((err) => {
      res.json(err);
    })
})

router.post('/todo/complete/clear', async (req, res) => {
  const io = req.app.get('io');

  Todo.deleteMany({isDone: true})
    .then((doc) => {
      Todo.find({})
        .then((doc) => {
          res.json(doc);
          io.emit('deleteCompleted', doc);
        })
        .catch((err) => {
          res.json(err);
        })
    })
})

router.delete('/todo/delete/:id', async (req, res) => {
  const id = req.params.id;
  const io = req.app.get('io');

  Todo.remove({_id: id})
    .then((doc) => {
      res.json(doc);
      io.emit('deletedTodo', id);
    })
    .catch((err) => {
      res.json(err);
    })
})

module.exports = router
const {Schema, model} = require('mongoose');

const schema = new Schema({
  isDone: {
    type: Boolean,
    required: true,
  },
  value: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

module.exports = model('Todos', schema)
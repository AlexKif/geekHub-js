const {Schema, model} = require('mongoose');

const schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

module.exports = model('users', schema)
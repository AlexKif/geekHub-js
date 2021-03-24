const {Schema, model} = require('mongoose');

const schema = new Schema({
  token: {
    type: String,
    required: true,
  },
  _id: {
    type: Schema.ObjectId,
    required: true,
  }
}, {
  versionKey: false
})

module.exports = model('Tokens', schema)
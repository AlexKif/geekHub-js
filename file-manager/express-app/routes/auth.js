const { Router } = require('express')
const router = Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const User = require('../models/user');
const Token = require('../models/token');

const setUserToken = (id, hash) => {
  const token = new Token({
    token: hash,
    _id: id
  })
  return token.save();
}

router.post("/registration", async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password + req.body.email, salt);
  const user = new User({email: req.body.email, password: hash});

  user.save().then(doc => {
    setUserToken(doc['_doc']['_id'], hash).then(doc => {
      res.json({email: req.body.email, password: req.body.password, token: doc['_doc']['token']});
    })
  });

});

module.exports = router


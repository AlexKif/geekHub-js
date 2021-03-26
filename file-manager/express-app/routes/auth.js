const { Router } = require('express')
const router = Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const User = require('../models/user');
const Token = require('../models/token');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function saveToken(id, hash) {
  const token = new Token({
    token: hash,
    _id: id,
  })
  return token.save();
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(403);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    console.log(err)
    if (err) return res.sendStatus(403);
    req.decoded = decoded
    next();
  })
}

function generateAccessToken(email, isRemember = true) {
  return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: isRemember ? '2d': '1h' });
}

router.post("/registration", (req, res) => {
  const hash = bcrypt.hashSync(req.body.password + req.body.email, salt);
  const user = new User({email: req.body.email, password: hash});
  const token = generateAccessToken({email: req.body.email});
  User.findOne({email: req.body.email}, function(err, doc) {
    if (err) return res.json(err);
    if (!doc) {
      user.save().then(doc => {
        saveToken(doc['_doc']['_id'], token).then(doc => {
          res.json({email: req.body.email, password: req.body.password, token: token});
        })
      });
    } else {
      return res.status(400).json({message: 'This email is already registered'});
    }
  });
});

router.post('/login', (req, res, next) => {
  const token = generateAccessToken({email: req.body.email}, req.body.remember);
  User.findOne({email: req.body.email}, function(err, doc) {
    if (err) return res.json(err);
    if (!doc) return res.status(400).json({message: 'User with this email not found'});
    req.user = doc['_doc'];

    const reqPass = req.body.password + req.body.email;
    const userPass = doc['_doc'].password;
    const decodedPass = bcrypt.compareSync(reqPass, userPass);

    if (decodedPass) {
      Token.findByIdAndUpdate(req.user['_id'], {token: token}, function (err, doc) {
        if (err) return res.json(err);
        if (doc) return res.json({token: token});
      })
    } else {
      return res.status(400).json({message: 'Email or password is incorrect'});
    }
  })
});

module.exports = router

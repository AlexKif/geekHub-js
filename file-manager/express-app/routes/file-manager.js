const { Router } = require('express')
const router = Router();
const fs = require('fs')
const {authenticateToken} = require("../functions");
const {createRootDocument} = require("../functions");
const path = require('path');

const User = require('../models/user');
const Token = require('../models/token');

router.post('/file-manager/folder', authenticateToken, function (req, res) {
  const token = req.headers.authorization.split(' ')[1];
  Token.findOne({token: token}, function (err, doc) {
    const folderName = req.body.folderName;
    createRootDocument(`./storage/${doc['_doc']['_id']}/${folderName}`);
    return res.json({folderName: folderName});
  })
})


router.get('/file-manager/files/:path?', authenticateToken, async function (req, res) {
  const token = req.headers.authorization.split(' ')[1];
  Token.findOne({token: token}, function (err, doc) {
    const root = `./storage/${doc['_doc']['_id']}`;
    const files = fs.readdirSync(root).sort(item => {
      if (item.split('.').length >= 2) {
        return 1
      }
      return -1
    });
    return res.json({files: files});
  })
})

module.exports = router
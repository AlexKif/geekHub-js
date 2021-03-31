const { Router } = require('express')
const router = Router();
const fs = require('fs')
const {authenticateToken} = require("../functions");
const {createRootDocument} = require("../functions");

const User = require('../models/user');
const Token = require('../models/token');

router.post('/file-manager/folder', authenticateToken, function (req, res) {
  const token = req.headers.authorization.split(' ')[1];
  Token.findOne({token: token}, function (err, doc) {
    if (err) return res.json(err);

    const folderName = req.body.folderName;
    createRootDocument(`./storage/${doc['_doc']['_id']}/${folderName}`);
    return res.json({folderName: folderName});
  })
})


router.get('/file-manager/files', authenticateToken, async function (req, res) {
  const reqPath = String(req.query.path);
  const token = req.headers.authorization.split(' ')[1];

  Token.findOne({token: token}, function (err, doc) {
    if (err) return res.json(err);

    const root = `./storage/${doc['_doc']['_id']}`;
    const path = reqPath ? `${root}/${reqPath.replace(/,/g,"/")}`: root;
    const files = fs.readdirSync(path);
    if (!files) return res.json({message: 'files not found'});
    const sortedFiles = files
      .map(item => {
        const isDir = fs.lstatSync(`${path}/${item}`).isDirectory();
        return {
          name: item, type: isDir ? 'folder': 'file'
        }
      })
      .sort(item => {
        return item.type === 'folder' ? -1: 1;
      });

    return res.json({files: sortedFiles});
  })
})

module.exports = router
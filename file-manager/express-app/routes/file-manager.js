const { Router } = require('express')
const router = Router();
const fs = require('fs')
const {authenticateToken} = require("../functions");
const {createRootDocument} = require("../functions");
const multer = require('multer');
const Token = require('../models/token');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const reqPath = req.query.path;
    const token = req.headers.authorization.split(' ')[1];
    Token.findOne({token: token}, function (err, doc) {
      if (err) return cb(err)
      const root = `storage/${doc['_doc']['_id']}`;
      const path = reqPath ? `${root}/${reqPath.join('/')}`: root;
      cb(null, path)
    })
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post('/file-manager/folder', authenticateToken, function (req, res) {
  const reqPath = req.query.path;
  const token = req.headers.authorization.split(' ')[1];
  Token.findOne({token: token}, function (err, doc) {
    if (err) return res.json(err);

    const folderName = req.body.folderName;
    const root = `./storage/${doc['_doc']['_id']}`;
    const path = reqPath ? `${root}/${reqPath.join('/')}`: root;
    createRootDocument(`${path}/${folderName}`);
    return res.json({name: folderName, type: 'folder'});
  })
})


router.get('/file-manager/files', authenticateToken, async function (req, res) {
  const reqPath = req.query.path;
  const token = req.headers.authorization.split(' ')[1];

  Token.findOne({token: token}, function (err, doc) {
    if (err) return res.json(err);

    const root = `./storage/${doc['_doc']['_id']}`;
    const path = reqPath ? `${root}/${reqPath.join('/')}`: root;
    try {
      const files = fs.readdirSync(path);
      if (!files) return res.json({message: 'files not found'});
      const sortedFiles = files
        .map(item => {
          const isDir = fs.lstatSync(`${path}/${item}`).isDirectory();
          const size = fs.lstatSync(`${path}/${item}`).size;
          if (isDir) {
            return {
              name: item, type: 'folder'
            }
          }
          return {
            name: item, type: 'file', size
          }
        })
        .sort(item => {
          return item.type === 'folder' ? -1: 1;
        });

      return res.json({files: sortedFiles});
    } catch (err) {
      return res.json(err);
    }

  })
})

router.post('/file-manager/files', authenticateToken, upload.array('file', 5), function (req, res) {
  const data = req.files.map(item => {
    return {
      name: item.originalname,
      type: 'file',
      size: item.size
    }
  })
  return res.json({files: data});
})

router.get('/file-manager/images/:name', authenticateToken, function (req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const reqPath = req.query.path;

  const image = req.params.name;

  Token.findOne({token: token}, function (err, doc) {
    if (err) return res.json(err);

    const root = `./storage/${doc['_doc']['_id']}`;
    const path = reqPath ? `${root}/${reqPath.join('/')}`: root;
    // const file = fs.readFileSync(`${path}/${image}`, {encoding: 'utf8', flag:'r'})

    res.sendFile(`${path}/${image}`);

    // return res.json({name: folderName, type: 'folder'});
  })
})

module.exports = router
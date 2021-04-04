const { Router } = require('express')
const router = Router();
const fs = require('fs')
const {authenticateToken} = require("../functions");
const {createRootDocument} = require("../functions");
const multer = require('multer');
const ncp = require('ncp').ncp;
const Token = require('../models/token');


ncp.limit = 16;

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

const uniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
}


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
              name: item, type: 'folder', id: uniqueId()
            }
          }
          return {
            name: item, type: 'file', size, id: uniqueId()
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

router.post('/file-manager/files', authenticateToken, upload.array('file', 10), function (req, res) {
  const data = req.files.map(item => {
    return {
      name: item.originalname,
      type: 'file',
      size: item.size,
      id: uniqueId()
    }
  })
  return res.json({files: data});
})

router.get('/file-manager/download/:name', authenticateToken, function (req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const reqPath = req.query.path;
  const name = req.params.name;

  Token.findOne({token: token}, function (err, doc) {
    if (err) return res.json(err);

    const root = `./storage/${doc['_doc']['_id']}`;
    const generatedPath = reqPath ? `${root}/${reqPath.join('/')}`: root;
    const file = fs.readFileSync(`${generatedPath}/${name}`, {encoding: 'base64'})

    return res.json({file: file})

  })
})

router.get('/file-manager/delete/:name', authenticateToken, function (req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const reqPath = req.query.path;
  const name = req.params.name;

  Token.findOne({token: token}, function (err, doc) {
    if (err) return res.json(err);

    const root = `./storage/${doc['_doc']['_id']}`;
    const generatedPath = reqPath ? `${root}/${reqPath.join('/')}`: root;
    const isDir = fs.lstatSync(`${generatedPath}/${name}`).isDirectory();
    if (isDir) {
      fs.rmdirSync(`${generatedPath}/${name}`, { recursive: true });
    } else {
      fs.unlinkSync(`${generatedPath}/${name}`);
    }

    return res.json({deleted: true})
  })
})

router.get(`/file-manager/:action(cut|copy)/:name`, authenticateToken, function (req, res) {
  const token = req.headers.authorization.split(' ')[1];

  const from = req.query.from;
  const to = req.query.to;
  const name = req.params.name;
  const action = req.params.action;

  Token.findOne({token: token}, function (err, doc) {
    if (err) return res.json(err);

    const root = `./storage/${doc['_doc']['_id']}`;
    const generatedFromPath = from ? `${root}/${from.join('/')}`: root;
    const generatedToPath = to ? `${root}/${to.join('/')}`: root;
    const isDir = fs.lstatSync(`${generatedFromPath}/${name}`).isDirectory();

    ncp(`${generatedFromPath}/${name}`, `${generatedToPath}/${name}`, function (err) {
      try {
        if (err) return res.json({err});

        const result = {name: name, type: isDir ? 'folder': 'file', id: uniqueId()}

        if (!isDir) {
          result.size = fs.lstatSync(`${generatedToPath}/${name}`).size;
        }

        action === 'cut' ? fs.rmdirSync(`${generatedFromPath}/${name}`, { recursive: true }): null;
        return res.json([{...result}]);
      } catch (err) {
        return res.status(400).json({err});
      }
    });
  })
})

router.post('/file-manager/rename/:name', authenticateToken, function (req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const reqPath = req.query.path;
  const name = req.params.name;

  Token.findOne({token: token}, function (err, doc) {
    if (err) return res.json(err);

    const root = `./storage/${doc['_doc']['_id']}`;
    const generatedPath = reqPath ? `${root}/${reqPath.join('/')}`: root;
    const newName = req.body.newName;

    try {
      fs.renameSync(`${generatedPath}/${name}`, `${generatedPath}/${newName}`);
      return res.json({newName})
    } catch (err) {
      return res.json({err})
    }
  })
})

module.exports = router
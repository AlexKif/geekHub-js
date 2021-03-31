const fs = require('fs');
const jwt = require('jsonwebtoken');

/*Create folder*/
function createRootDocument(path) {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
}

/*Check token*/
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(403);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.decoded = decoded
    next();
  })
}

module.exports.createRootDocument = createRootDocument;
module.exports.authenticateToken = authenticateToken;
'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
const multer = require('multer');
// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    console.log('file', file);
    cb(null, file.originalname)
  }
})
 
const upload = multer({ storage: storage })


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile') ,(req, res) => {
  if(req.file) {
    const { filename, size, mimetype} = req.file;
    res.json({
      name: filename,
      type: mimetype,
      size
    });
  } else {
    res.send('File is not uploaded.')
  }
  
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
// const { convertHtmlToDelta } = require('node-quill-converter');
const { convertHtmlToDelta } = require('./editorScript');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/', (req, res) => {
  res.status(200).send({
    message: 'Delta Convertion API',
  });
});

app.post('/api/convert', (req, res) => {
  try {
    const data = req.body;
    console.log('data',data);
    const temp = [];
    for (const iterator of data) {
      const delta = convertHtmlToDelta(iterator.html);
      temp.push({
        id: iterator.id,
        delta: delta.ops,
      });
    }
    res.status(200).send({
      message: 'Success',
      data: temp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error',
      error: error,
    });
  }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));


module.exports = app;
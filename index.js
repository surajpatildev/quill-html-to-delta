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
    // const data = [
    //   {
    //     id: '123',
    //     html: '<p>Hello <span class="mention" data-index="1" data-denotation-char="@" data-id="83cadfb3-25f5-471e-a155-317eebffe090" data-value="Chirag Vaghasiya">﻿<span contenteditable="false"><span class="ql-mention-denotation-char">@</span>Chirag Vaghasiya</span>﻿</span>  and <span class="mention" data-index="2" data-denotation-char="@" data-id="e3c982ca-c5a1-4cf6-82e6-e98fb92a85e0" data-value="Chirag 123">﻿<span contenteditable="false"><span class="ql-mention-denotation-char">@</span>Chirag 123</span>﻿</span> </p>',
    //   },
    //   {
    //     id: '123',
    //     html: '<p>Test</p>',
    //   },
    // ];
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
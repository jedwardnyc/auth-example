const express = require('express');
const path = require('path');
const app = express();

app.use('/github', require('./github'));
app.use('/google', require('./google'));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
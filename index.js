const { json } = require('express');
var cors = require('cors')
const express = require('express');
const { use } = require('./api/curdapi')
const app = express();

require('./db/connce');
app.use(cors())
app.use(json());

app.use('/public/', express.static('public'));

app.listen(1122, () => {
    console.log('I am Server');
});

app.use('/api', require('./api/curdapi'));
app.use('/', (req, res) => {
    res.send(" <h1>Backend Started</h1>");
})
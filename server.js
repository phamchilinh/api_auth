const express = require("express");
const db = require('./api/db');
const athRoutes = require('./api/routes/router');

//connect db
db.connect();

const app = express();
const port = 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json()); 

app.use('/api/user', athRoutes);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port, () => {});
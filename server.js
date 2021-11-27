const express = require("express");
const routes = require("./api/routes");
const db = require('./api/db');

//connect db
db.connect();

const app = express();
const port = 5000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json()); 

routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port, () => {});
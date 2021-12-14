const express = require("express");
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const db = require('./db');

//connect db
db.connect();

const app = express();
const port = 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(port, () => {});
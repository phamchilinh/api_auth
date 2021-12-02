const express = require("express");
const db = require('./api/db');
const userRoutes = require('./api/routes/user');
const adminRoutes = require('./api/routes/admin');
const { authUser , authPermission } = require('./auth/basicAuth');
const per = 'ADMIN';

//connect db
db.connect();
const User = require('./api/models/User');
const Permission = require('./api/models/Permission');

const app = express();
const port = 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json()); 

app.use(setUser);
app.use(setPer);

app.use('/api/user', authUser, userRoutes);
app.use('/api/admin',authUser, authPermission(per), adminRoutes);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
});

async function setUser(req, res, next) {
    const email_req = req.body.email;
    if (email_req) {
      req.user = await User.findOne({ email: email_req });
    }
    next();
}

async function setPer(req, res, next) {
    if (req.user) {
        req.per = await Permission.findOne({ user_id: req.user._id });
    }
    next();
}
app.listen(port, () => {});
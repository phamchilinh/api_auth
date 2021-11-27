const util = require('util');
const mongoose = require("mongoose");
const User = require('../models/users');

module.exports = {
    get: (req, res) => {
        User.find().then((user) => {
          res.send({user});
        }, (e) => {
          res.status(400).send(e);
        });
    },
    post: (req, res) => {
        let users = new User({
            userCode: req.body.userCode,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        // result = User.addUser(user);
        users.save().then((user) => {
          res.send(user);
        }, (e) => {
          res.status(400).send(e);
        });
    },
    put: (req, res) => {
        let query = { userCode: req.query.userCode };
      
        User.findOneAndUpdate(query, {
          role: req.body.role,
          password: req.body.password
        }, {upsert:true}, (e, raw) => {
          if (e) {
            res.status(400).send('Invalid user supplied');
          }
          res.send(raw);
        });
    },
    delete: (req, res) => {
        let query = { userCode: req.query.userCode };
        User.findOneAndRemove(query, 
          (e, raw) => {
            if (e) {
              res.status(400).send('Invalid username supplied');
            }
          res.send(raw);
        });
    }
}
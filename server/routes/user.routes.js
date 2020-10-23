const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../modals/modal');
const UserSession = require('../modals/userSession');
const jwt = require('jsonwebtoken');
process.env.TOKEN_KEY = 'axcgyukmlpjsfihasbao';
const uuidv4 = require('uuid/v4');
// const mongoURI = Enter your key

const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true })
conn.once('open', () => {
    console.log('Connection Successful')
})

//to get the details of the user
router.route('/myDetails').get((req, res) => {
    User.findOne({ _id: req.query.id })
        .then((result) => {
            if (!result) {
                console.log("user not found");
            }
            else {
                res.status(200).send({
                    success: true,
                    message: 'users details',
                    result: result
                })
            }
        });
})


//for verifying the otp

router.route('/create').post((req, res, next) => {

    console.log("inserting to database");
    User.findOne({ email: req.body.email }, function (err, user) {
        console.log('called me thanks');
        if (err) {
            return res.status(500).send({
                message: 'server responded with internal error'
            });
        }
        if (user) {
            console.log(user);
            console.log("hey");
            res.send("Email already exists");
        }
        else {
            let uniqueID=uuidv4();
            const datas = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType,
                userId:uniqueID
            })
            datas.save()
                .then(() => {
                    res.send({
                        success:true,
                        message:'User Created'
                    })
                })
        }
    });
});


//users information is authenticated and creating user token
router.route('/signin').post((req, res, err) => {
    console.log("i am here");

    User.findOne({ email: req.body.email })
        .then((user) => {
            console.log(user)
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "The user with the email address doesn't exists",
                })
            }
            else if (user.password != req.body.password) {
                return res.status(204).send({
                    success: false,
                    message: "password doesn't match with the original password"
                })
            }
            else {
                console.log("logged in successfully");
                console.log(process.env.TOKEN_KEY);
                const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);
                const id = user._id
                const userSession = new UserSession({
                    userToken: token,
                    userMail: req.body.email,
                    userId: id
                });
                userSession.save((err, doc) => {
                    if (err) {
                        console.log(err);
                    }

                    return res.send({
                        success: true,
                        message: 'valid sign in',
                        token: doc.userToken,
                        email: doc.userMail,
                        userId: doc.userId,
                        userType:user.userType
                    });
                });

            }
        })
        .catch((err) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: "can't login due to some error"
                })
            }
        })
});

//verifying user when user enters into the site confirming as if users token hasn't expire
router.route('/verify').post((req, res, next) => {
    UserSession.findOne({ userToken: req.body.token }, (err, user) => {
        console.log(" i am fine here");
        if (err) {
            console.log(err);
        }
        if (!user) {
            console.log("invalid token");
            return res.send({
                success: false,
                message: 'not verified'
            })
        }
        else {
            console.log("here inside else");
            return res.status(200).send(JSON.stringify({
                success: true,
                message: 'verified'
            }));
        }
    });
});

module.exports = router;
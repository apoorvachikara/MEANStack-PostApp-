const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');


exports.createUser = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const newUser = new User({
                email: req.body.email,
                password: hash
            });
        newUser.save()
            .then((document) => {
                res.status(201).json({
                    message: 'User Created',
                    result: document
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Invalidi Authentication Error'
                })
            });
        });
}

exports.userLogin = (req, res, next) => {

    let userFetched;

    User.findOne({email: req.body.email})
        .then((user) => {
            if(!user){
              return  res.status(401).json({
                    message: "No user Exist"
                })
            }
            userFetched = user;
           return bcrypt.compare(req.body.password, user.password)
        })
        .then((result) => {
            console.log(result, 'result');
            if(!result){
               return res.status(401).json({
                    message: "Authentication Failed"
                })
            }

            const token = jwt.sign(
                {email: userFetched.email, userId: userFetched._id},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
                )
            res.status(200).json({
                userId: userFetched._id,
                token: token,
                expires: 3600
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Invalid Credentials",
                error: err
            })
        })
    }

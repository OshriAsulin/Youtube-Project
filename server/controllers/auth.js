
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { creatError } = require('../error');
const jwt = require('jsonwebtoken');



//signup/ register
exports.signup = async (req, res, next) => {
    //for hash the password for security
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({ ...req.body, password: hash })
    // name: req.body.name,
    // email: req.body.email,
    // password: hash,
    // img: req.body.img
    try {
        await newUser.save()
        // res.status(200)
        // res.send(newUser)

        res.status(200).send(newUser)
        // express deprecated res.send(status, body): Use  instead controllers\auth.js:27:13
    }
    catch (err) {

        // next(err)
        console.log(err)
        // res.status(500)
    }
}


// signin
exports.signin = async (req, res, next) => {
    try {
        console.log(req.body)
        const user = await User.findOne({ name: req.body.name })
        if (!user)
            return next(creatError(404, "User not found!"))

        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isCorrect)
            return next(creatError(400, "Password not found!"))

        const token = jwt.sign({ id: user._id }, process.env.JWT)

        // this line is for send the details of user without password
        const { password, ...others } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200)
            .json(others)
        // .json(user)
    }
    catch (err) {

        next(err)
        console.log(err)
    }
}


exports.googleAuth = async (req, res, next) => {
    try {
        
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            console.log('user',user)
            const token = jwt.sign({ id: user._id }, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200)
                .json(user._doc)
                
        }else{
            const newUser = new User({
                ...req.body, 
                fromGoogle: true
            })
            const savedUser = await newUser.save();
            console.log('user',newUser)
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200)
                .json(savedUser._doc)
        }
    }
    catch (err) {
        next(err)
        console.log('err auth google', err)
    }
}


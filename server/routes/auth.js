const express = require('express')
const { signup, signin, googleAuth } = require('../controllers/auth')
const User = require('../models/User')

const router = express.Router()

router.get('/', async (req,res)=>{
    res.send('dsfsdfsd')
})

//create a user
router.post('/signup', signup)


//sign in
router.post('/signin', signin)


//google authentication
router.post('/google', googleAuth)


module.exports = router
const express = require('express')
const User = require('../models/User')
const { getAllUsers, update, deleteUser, getUser,  subscribe, unsubscribe, likeVideo, disLikeVideo  } = require('../controllers/user')
const { verifyToken } = require('../verifyToken.js')


const router = express.Router()

//get all users
router.get('/',getAllUsers)


//update user
router.put('/:id', verifyToken, update)

//delete user
router.delete('/:id',verifyToken ,deleteUser)

//get a user
router.get('/find/:id', getUser)

//subscribe a user
router.put('/sub/:id',verifyToken ,subscribe )

//unsubscribe a user
router.put('/unsub/:id' ,verifyToken ,unsubscribe )

//like a video
router.put('/like/:videoId' ,verifyToken ,likeVideo )

//dislike a video
router.put('/dislike/:videoId' ,verifyToken ,disLikeVideo )



module.exports = router
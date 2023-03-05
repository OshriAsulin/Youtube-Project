const express =  require('express')
const { addComment, getComments, deleteComment } = require('../controllers/comment')
const { verifyToken } = require('../verifyToken')


const router = express.Router()


router.post('/', verifyToken, addComment )
router.delete('/:id', verifyToken, deleteComment )
router.get('/:videoId', getComments )





module.exports = router
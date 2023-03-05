const express =  require('express')
const { addVideo, getVideo, updateVideo, deleteVideo, addView,  randomVideo, subscribesVideo, trendVideo, getByTags, searchVideo } = require('../controllers/video')
const { verifyToken } = require('../verifyToken')


const router = express.Router()


router.post('/' ,verifyToken ,addVideo)
router.put('/:id' ,verifyToken ,updateVideo)
router.delete('/:id' ,verifyToken ,deleteVideo)
router.get('/find/:id', getVideo)

router.put('/view/:id', addView)
router.get('/trend', trendVideo)
router.get('/random', randomVideo)
router.get('/sub' ,verifyToken ,subscribesVideo)

router.get('/tags' ,getByTags)
router.get('/search' ,searchVideo)




module.exports = router
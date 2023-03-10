const { creatError } = require('../error')
const User = require('../models/User')
const Video = require('../models/Video')

//add video
exports.addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body })
    try {
        const saveVideo = await newVideo.save()
        res.status(200).json(saveVideo)
    }
    catch (err) {
        console.log('error here', err)
        next(err);
    }
}

//update video
exports.updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video)
            return next(creatError(404, "Video not found"))

        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true })
            res.status(200).json(updatedVideo)
        } else {
            return next(creatError(403, "You can update your video"))
        }
    }
    catch (err) {
        next(err);
    }
}

//delete video
exports.deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video)
            return next(creatError(404, "Video not found"))

        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(
                req.params.id)
            res.status(200).json("The video has been deleted")
        } else {
            return next(creatError(403, "You can update your video"))
        }
    }
    catch (err) {
        next(err);
    }
}

//get video
exports.getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    }
    catch (err) {
        next(err);
    }
}

//add view
exports.addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        res.status(200).json("The view has been increased")
    }
    catch (err) {
        next(err);
    }
}

//random video
exports.randomVideo = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    }
    catch (err) {
        next(err);
    }
}


exports.trendVideo = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 })
        res.status(200).json(videos)
    }
    catch (err) {
        next(err);
    }
}


exports.subscribesVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribesUsers;

        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId });
            })
        )
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    }
    catch (err) {
        next(err);
    }
}

exports.getByTags = async (req, res, next) => {
    const tags = req.query.tags.split(",")
    // console.log(tags)
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos)
    }
    catch (err) {
        next(err);
    }
}

exports.searchVideo = async (req, res, next) => {
    const query = req.query.q
    try {
        const videos = await Video.find({
            title:{$regex: query, $options: "i" }}).limit(40)
        res.status(200).json(videos)
    }
    catch (err) {
        next(err);
    }
}


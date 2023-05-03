const express = require('express');
const mongoose = require('mongoose')
const app = express();

const bodyparser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
// const userRoutes = require('./routes/users')
const userRoutes = require('./routes/users')
const videoRoutes = require('./routes/videos')
const commentRoutes = require('./routes/comments')
const authRoutes = require('./routes/auth')
 
require('dotenv').config()
// console.log(process.env)

const User = require('./models/User');
app.use(cookieParser());
// app.use(express.json())
app.use(bodyparser.json());
app.use(cors());

app.use('/users', userRoutes)
app.use('/videos', videoRoutes)
app.use('/comments', commentRoutes)
app.use('/auth', authRoutes)

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/client/build')))
app.get('*', (req, res)=>{
    res.sendFile(path.join(_dirname, '/client/build/index.html'))
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});


mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('connected to db');
        app.listen(process.env.PORT, () => {
            console.log('server listen in port', process.env.PORT)
        })
// const deleteUser = await User.deleteOne({_id:'64047ad3a06c91f7fa33d025'})
// console.log(deleteUser)


        // const users = await User.find();
        // console.log(users)

    })
    .catch(err => console.log('err', err))
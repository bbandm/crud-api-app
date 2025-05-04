const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Hello from Node API')
})

app.use('/api/members', require('./routes/member.route'))
app.use('/api/peer-reviews', require('./routes/peerReview.route'))

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    });  
})
.catch(() => {
    console.error('Error connecting to MongoDB')
})
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const tvRouter = require('./routes/tvRoute')

const app = express();
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, {useUnifiedTopology: true})
const PORT = 3002;

client.connect(function(err) {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))

    const db = client.db('EntertainMe')

    app.use((req, res, next) => {
        req.db = db
        next()
    })

    app.use('/', tvRouter)

    app.listen(PORT, () => {
        console.log('Connected on port ' + PORT)
    })
})
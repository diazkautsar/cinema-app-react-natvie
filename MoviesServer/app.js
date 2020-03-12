const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const movieRouter = require('./routes/movieRouter')

const app = express();
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, {useUnifiedTopology: true})
const PORT = 3001;

const dbName = 'EntertainMe'

const insertMovie = function(db, callback) {
    const movies = db.collection('movies')
    movies.insertMany([
        {
            title: 'Jan Darra',
            overview: 'Good',
            poster_path: 'https://m.media-amazon.com/images/M/MV5BN2FmZjQ1YmItZGI5OC00NmM2LTliZGUtZmNmZjkyOTA0OGNhXkEyXkFqcGdeQXVyMzU4Nzk4MDI@._V1_UY1200_CR85,0,630,1200_AL_.jpg',
            popularity: 9.8,
            tags: ['drama', 'romance']
        },
        {
            title: 'Jan Darra Finale',
            overview: 'Good',
            poster_path: 'https://m.media-amazon.com/images/M/MV5BN2FmZjQ1YmItZGI5OC00NmM2LTliZGUtZmNmZjkyOTA0OGNhXkEyXkFqcGdeQXVyMzU4Nzk4MDI@._V1_UY1200_CR85,0,630,1200_AL_.jpg',
            popularity: 9.5,
            tags: ['drama', 'romance']
        }
    ], (err, result) => {
        callback(result)
    })
}

client.connect(function(err) {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    // console.log('connected successfully to server')

    const db = client.db(dbName)
    
    // insertMovie(db, function() {
    //     client.close();
    // })

    app.use((req, res, next) => {
        req.db = db
        next()
    })

    app.use('/', movieRouter)

    app.listen(PORT, () => {
        console.log('Connected on port ' + PORT)
    })

})

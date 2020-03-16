const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const tvRouter = require('./routes/tvRoute')

const app = express();
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, {useUnifiedTopology: true})
const PORT = 3002;

const insertTv = function(db, callback) {
    const movies = db.collection('TVseries')
    movies.insertMany([
        {
            title: 'Breaking Bad',
            overview: 'Good',
            poster_path: 'https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTYtZTA3ZWFkODRkNmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
            popularity: 9.5,
            tags: ['Crime', 'Drama', 'Thriller']
        },
        {
            title: 'Game of Thrones',
            overview: 'Good',
            poster_path: 'https://cdn.gbposters.com/media/catalog/product/cache/1/image/737x938/9df78eab33525d08d6e5fb8d27136e95/f/p/fp4830_got_throne_of_the_dead.jpeg',
            popularity: 9.3,
            tags: ['Action', 'Adventure', 'Drama']
        }, 
        {
            title: 'Friends',
            overview: 'Good',
            poster_path: 'https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UY268_CR0,0,182,268_AL_.jpg',
            popularity: 8.9,
            tags: ['Comedy', 'Romance']
        }, 
        {
            title: 'The Sopranos',
            overview: 'Good',
            poster_path: 'https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBjYy00OWU1LTg5OTYtNmYwOTZmZjE3ZDdhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
            popularity: 9.2,
            tags: ['Crime', 'Drama']
        }
    ], (err, result) => {
        callback(result)
    })
}

client.connect(function(err) {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))

    const db = client.db('EntertainMe')

    // insertTv(db, function() {
    //     client.close();
    // })

    app.use((req, res, next) => {
        req.db = db
        next()
    })

    app.use('/', tvRouter)

    app.listen(PORT, () => {
        console.log('Connected on port ' + PORT)
    })
})
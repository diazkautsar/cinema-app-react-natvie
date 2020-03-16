const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const movieRouter = require('./routes/movieRouter')

const app = express();
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, {useUnifiedTopology: true})
const PORT = 3001;

const dbName = 'EntertainMe'

// const insertMovie = function(db, callback) {
//     const movies = db.collection('movies')
//     movies.insertMany([
//         {
//             title: 'Parasite',
//             overview: 'Good',
//             poster_path: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
//             popularity: 8.6,
//             tags: ['Comedy', 'Drama', 'Thriller']
//         },
//         {
//             title: '1917',
//             overview: 'Good',
//             poster_path: 'https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_UX182_CR0,0,182,268_AL_.jpg',
//             popularity: 8.4,
//             tags: ['Drama', 'War']
//         }, 
//         {
//             title: 'Knives Out',
//             overview: 'Good',
//             poster_path: 'https://m.media-amazon.com/images/M/MV5BMGUwZjliMTAtNzAxZi00MWNiLWE2NzgtZGUxMGQxZjhhNDRiXkEyXkFqcGdeQXVyNjU1NzU3MzE@._V1_.jpg',
//             popularity: 8.0,
//             tags: ['Comedy', 'Crime', 'Drama']
//         }, 
//         {
//             title: 'Joker',
//             overview: 'Good',
//             poster_path: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
//             popularity: 8.6,
//             tags: ['Thriller', 'Crime', 'Drama']
//         }
//     ], (err, result) => {
//         callback(result)
//     })
// }

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

const movieModel = require('../model/movieModel')

class Movie {
    static findAll (req, res) {
        movieModel.findAll(req.db)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }

    static create (req, res) {
        const movie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster,
            popularity: req.body.popularity,
            tags: req.body.tags
        }
        movieModel.create(req.db, movie)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }

    static delete (req, res) {
        const id = req.params.id
        const db =  req.db
        movieModel.delete(db, id)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }

    static update (req, res) {
        const id = req.params.id
        const db = req.db
        const updatedMovie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster,
            popularity: req.body.popularity,
            tags: req.body.tags
        }
        movieModel.update(db, id, updatedMovie)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }
}

module.exports = Movie 
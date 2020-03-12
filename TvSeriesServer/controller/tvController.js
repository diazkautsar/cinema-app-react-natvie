const tvModel = require('../model/tvModel')

class Tv {
    static findALl (req, res) {
        tvModel.findAll(req.db)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }

    static create (req, res) {
        const tvseries = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster,
            popularity: req.body.popularity,
            tags: req.body.tags
        }
        tvModel.create(req.db, tvseries)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }

    static delete (req, res) {
        const id = req.params.id
        const db = req.db
        tvModel.delete(db, id) 
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }

    static update (req, res) {
        const id = req.params.id
        const db = req.db
        const updatedTv = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster,
            popularity: req.body.popularity,
            tags: req.body.tags
        }
        tvModel.update(db, id, updatedTv)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }
}

module.exports = Tv
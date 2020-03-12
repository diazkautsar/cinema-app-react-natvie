const ObjectID = require('mongodb').ObjectID;

class Movie {
    static findAll (db) {
        return db.collection('movies').find({}).toArray()
    }

    static create (db, movie) {
        return db.collection('movies').insert(movie)
    }

    static delete (db, id) {
        return db.collection('movies').deleteOne({ 
            "_id": ObjectID(id) 
        })
    } 

    static update (db, id, updated) {
        return db.collection('movies').updateOne({
            "_id": ObjectID(id),
        }, {
            $set: updated
        })
    }
}

module.exports = Movie
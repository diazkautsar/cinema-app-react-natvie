const ObjectId = require('mongodb').ObjectID;

class Tv {
    static findAll (db) {
        return db.collection('TVseries').find({}).toArray()
    }

    static create (db, tv) {
        return db.collection('TVseries').insert(tv)
    }

    static delete (db, id) {
        return db.collection('TVseries').deleteOne({
            "_id": ObjectId(id)
        })
    }

    static update (db, id, updated) {
        return db.collection('TVseries').updateOne({
            "_id": ObjectId(id)
        }, {
            $set: updated
        })
    }
}

module.exports = Tv
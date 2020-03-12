const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class Orchestra {
    static getAll (req, res) {
        const result = {}
        redis.get('allData')
            .then(result => {
                if (result) {
                    res.status(200).json(JSON.parse(result))
                } else {
                    return axios.get('http://localhost:3001/movies')
                }
            })
            .then(({data}) => {
                result.movies = data
                return axios.get('http://localhost:3002/tvseries')
            })
            .then(({ data }) => {
                result.tv = data
                return redis.set('allData', JSON.stringify(result))
            })
            .then(_ => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }

    static createMovie (req, res) {
        redis
            .del('allData')
            .then(_ => {
                return axios.post('http://localhost:3001/movies', req.body)
            })
            .then(({ data }) => {
                res.status(201).json(data)
            })
            .catch(err => console.log(err))
    }

    static updateMovie (req, res) {
        const data = req.body
        redis
            .del('allData')
            .then(_ => {
                return axios({
                    method: 'patch',
                    url: 'http://localhost:3001/movies/' + req.params.id,
                    data
                })
            })
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static deleteMovie (req, res) {
        redis
            .del('allData')
            .then(_ => {
                return axios.delete('http://localhost:3001/movies/' + req.params.id)
            })
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => console.log(err))
    }
    
    static createSeries (req, res) {
        redis
            .del('allData')
            .then(_ => {
                return axios.post('http://localhost:3002/tvseries', req.body)
            })
            .then(({ data }) => {
                res.status(201).json(data)
            })
            .catch(err => console.log(err))
    }

    static updateSeries (req, res) {
        const data = req.body
        redis
            .del('allData')
            .then(_ => {
                return axios({
                    method: 'patch',
                    url: 'http://localhost:3002/tvseries/' + req.params.id,
                    data
                })
            })
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static deleteSeries (req, res) {
        redis
            .del('allData')
            .then(_ => {
                return axios.delete('http://localhost:3002/tvseries/' + req.params.id)
            })
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => console.log(err))
    }
}

module.exports = Orchestra
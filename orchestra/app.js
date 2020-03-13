// const express = require('express');
// const app = express();
// const routes = require('./routes/index')
// const port = 3000

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.use('/', routes)

// app.listen(port, () => {
//     console.log('connected on port' + port)
// })

const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')

const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Movie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }
    type Tvseries {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    type Query {
        getMovies: [Movie]
        getTv: [Tvseries]
    }

    input NewDataMovie {
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    input NewDataTvSeries {
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    input EditDataMovie {
        _id: ID!
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    input EditDataTv {
        _id: ID!
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    type Mutation {
        addNewMovie(input: NewDataMovie): Movie
        addNewTv(input: NewDataTvSeries): Tvseries
        deleteMovie(_id: ID!): Movie
        deleteTv(_id: ID!): Tvseries
        editMovie(input: EditDataMovie): Movie
        editTv(input: EditDataTv): Tvseries
    }
`;

const resolvers = {
    Query: {
        getMovies: async () => {
            try {
                const allDataMovie = await redis.get('allDataMovie')
                
                if (allDataMovie) return JSON.parse(allDataMovie)

                const { data } = await axios.get('http://localhost:3001/movies')
                const {_} = await redis.set('allDataMovie', JSON.stringify(data))
                return data
            } catch {
                throw new Error
            }
        },
        getTv: async () => {
            try {
                const allDataTv = await redis.get('allDataTv')

                if (allDataTv) return JSON.parse(allDataTv)

                const { data } = await axios.get('http://localhost:3002/tvseries')
                const {_} = await redis.set('allDataTv', JSON.stringify(data))
                return data
            } catch {
                throw new Error
            }
        }
    },
    Mutation: {
        addNewMovie: async (_, { input }) => {
            try {
                const _ = await redis.del('allDataMovie')
                const result = await axios.post('http://localhost:3001/movies', input)
                return result.data.result
            } catch {
                throw new Error
            }
        },
        addNewTv: async (_, { input }) => {
            try {
                const _ = await redis.del('allDataTv')
                const result = await axios.post('http://localhost:3002/tvseries', input)
                return result.data.result
            } catch {
                throw new Error
            }
        },
        deleteMovie: async (_, { _id }) => {
            try {
                const _ = await redis.del('allDataMovie')
                const result = await axios.delete('http://localhost:3001/movies/' + _id)
                return result
            } catch {
                throw new Error
            }
        },
        deleteTv: async (_, { _id }) => {
            try {
                const _ = await redis.del('allDataTv')
                const result = await axios.delete('http://localhost:3002/tvseries/' + _id)
                return result
            } catch {
                throw new Error
            }
        },
        editMovie: async (_, { input }) => {
            try {
                const _ = await redis.del('allDataMovie')
                const _id = input._id
                const result = await axios.patch('http://localhost:3001/movies/' + _id, input)
                return result
            } catch {
                throw new Error
            }
        },
        editTv: async (_, { input }) => {
            try {
                const _ = await redis.del('allDataTv')
                const _id = input._id
                const result = await axios.patch('http://localhost:3002/tvseries/' + _id, input)
                return result
            } catch {
                throw new Error
            }
        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})
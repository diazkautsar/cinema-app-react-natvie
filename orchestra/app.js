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
        addNewMovie(title:String, overview: String, poster_path: String, popularity: Float, tags:[String]): Movie
        addNewTv(title:String, overview: String, poster_path: String, popularity: Float, tags:[String]): Tvseries
        deleteMovie(_id: String): Movie
        deleteTv(_id: String): Tvseries
        editMovie(_id:String,title:String, overview: String, poster_path: String, popularity: Float, tags:[String]): Movie
        editTv(_id:String,title:String, overview: String, poster_path: String, popularity: Float, tags:[String]): Tvseries
    }
`;

const resolvers = {
    Query: {
        getMovies: async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/movies')
                console.log(data, "INI GET MOVIE")
                return data
            } catch {
                throw new Error
            }
        },
        getTv: async () => {
            try {
                const { data } = await axios.get('http://localhost:3002/tvseries')
                return data
            } catch {
                throw new Error
            }
        }
    },
    Mutation: {
        addNewMovie: async (_, args) => {
            try {
                const { title, overview, poster_path, popularity, tags } = args
                const input = { title, overview, poster_path, popularity, tags }
                const result = await axios.post('http://localhost:3001/movies', input)
                return result.data.result
            } catch {
                console.error()
                throw new Error
            }
        },
        addNewTv: async (_, args) => {
            try {
                const { title, overview, poster_path, popularity, tags } = args
                const input = { title, overview, poster_path, popularity, tags }
                const result = await axios.post('http://localhost:3002/tvseries', input)
                return result.data.result
            } catch {
                throw new Error
            }
        },
        deleteMovie: async (_, { _id }) => {
            try {
                const result = await axios.delete('http://localhost:3001/movies/' + _id)
                return result
            } catch {
                throw new Error
            }
        },
        deleteTv: async (_, { _id }) => {
            try {
                const result = await axios.delete('http://localhost:3002/tvseries/' + _id)
                return result
            } catch {
                throw new Error
            }
        },
        editMovie: async (_, args) => {
            try {
                const { _id, title, overview, poster_path, popularity, tags } = args
                const input = { title, overview, poster_path, popularity, tags }
                const result = await axios.patch('http://localhost:3001/movies/' + _id, input)
                return args
            } catch {
                throw new Error
            }
        },
        editTv: async (_, args) => {
            try {
                const { _id, title, overview, poster_path, popularity, tags } = args
                const input = { title, overview, poster_path, popularity, tags }
                const result = await axios.patch('http://localhost:3002/tvseries/' + _id, input)
                return args
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
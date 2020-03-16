import { gql } from "apollo-boost"

export const ALL_MOVIE = gql`
    {
        getMovies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`
export const ADD_MOVIE = gql`
mutation addMovie(
    $title: String, 
    $overview: String, 
    $poster_path: String,
    $popularity: Float,
    $tags: [String]) {
    addNewMovie(
      title: $title,
      overview: $overview,
      poster_path: $poster_path,
      popularity: $popularity,
      tags: $tags)
     {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const ALL_TV = gql`
    {
        getTv {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`
export const ADD_TV = gql`
mutation addTv(
    $title: String, 
    $overview: String, 
    $poster_path: String,
    $popularity: Float,
    $tags: [String]) {
    addNewTv(
      title: $title,
      overview: $overview,
      poster_path: $poster_path,
      popularity: $popularity,
      tags: $tags)
     {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const DELETE_MOVIE = gql`
  mutation deleteAMovie($_id: String) {
    deleteMovie(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DELETE_TV = gql `
mutation deleteATv($_id: String) {
  deleteTv(_id: $_id) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const EDIT_MOVIE = gql `
mutation editMovie(
  $_id: String
  $title: String, 
  $overview: String, 
  $poster_path: String, 
  $popularity: Float, 
  $tags:[String]){
  editMovie( 
    _id: $_id
    title: $title,
    overview: $overview,
    poster_path: $poster_path,
    popularity: $popularity,
    tags: $tags
  )
   {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const EDIT_TV = gql `
mutation editTv(
  $_id: String
  $title: String, 
  $overview: String, 
  $poster_path: String, 
  $popularity: Float, 
  $tags:[String]){
  editTv( 
    _id: $_id
    title: $title,
    overview: $overview,
    poster_path: $poster_path,
    popularity: $popularity,
    tags: $tags
  )
   {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button
} from 'react-native'

import { ADD_MOVIE, ALL_MOVIE, ADD_TV, ALL_TV } from '../Apollo/query'
import { useMutation } from '@apollo/react-hooks';

export default function Form({ navigation, route }) {
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPoster_path] = useState('')
    const [popularity, setPopularity] = useState(null)
    const [tags, setTags] = useState('')
    const { param } = route.params


    const [addMovie] = useMutation(ADD_MOVIE, {
        update(cache, { data: { addNewMovie } }) {
            const { getMovies } = cache.readQuery({ query: ALL_MOVIE })
            console.log(getMovies)
            cache.writeQuery({
                query: ALL_MOVIE,
                data: { getMovies: getMovies.concat([addNewMovie]) }
            })
        }
    })
    
    const [addTv] = useMutation(ADD_TV, {
        update(cache, { data: { addNewTv } }) {
            const { getTv } = cache.readQuery({ query: ALL_TV })
            cache.writeQuery({
                query: ALL_TV,
                data: { getTv: getTv.concat([addNewTv]) }
            })
        }
    })

    const handleOnSubmit = () => {
        if (param === 'Movie') {
            addMovie({ variables: { title, overview, poster_path, popularity: +popularity, tags } } )
        } else if (param === 'Tv') {
            addTv({ variables: { title, overview, poster_path, popularity: +popularity, tags } })
        }
        setTitle('')
        setOverview('')
        setPoster_path('')
        setPopularity('')
        setTags('')
        navigation.navigate(`${param}`)
    }

    return (
        <View style={styles.container}>
            <Text>Title: </Text>
            <TextInput
                style={styles.textInput}
                placeholder="INPUT MOVIE TITLE"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <Text>Overview: </Text>
            <TextInput
                style={styles.textInput}
                placeholder="OVERVIEW"
                value={overview}
                onChangeText={(text) => setOverview(text)}
            />
            <Text>Poster Path: </Text>
            <TextInput
                style={styles.textInput}
                placeholder="POSTER_PATH"
                value={poster_path}
                onChangeText={(text) => setPoster_path(text)}
            />
            <Text>Rating: </Text>
            <TextInput
                style={styles.textInput}
                placeholder="RATINGS"
                keyboardType="number-pad"
                value={popularity}
                onChangeText={(text) => setPopularity(text)}
            />
            <Text>Genre: </Text>
            <TextInput
                style={styles.textInput}
                placeholder="Genre1, Genre"
                onChangeText={input => setTags(input)}
                value={tags}
            />
            <View style={{ marginTop: 10 }}>
                <Button
                    title="ADD"
                    onPress={handleOnSubmit}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        borderWidth: 2,
        width: 300,
        borderRadius: 5,
        textAlign: 'center'
    }
});
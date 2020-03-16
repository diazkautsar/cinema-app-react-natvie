import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button
} from 'react-native'

import { EDIT_MOVIE, ALL_MOVIE, EDIT_TV, ALL_TV } from '../Apollo/query'
import { useMutation } from '@apollo/react-hooks';

export default function Form({ navigation, route }) {
    const { _id } = route.params
    const [title, setTitle] = useState(route.params.title)
    const [overview, setOverview] = useState(route.params.overview)
    const [poster_path, setPoster_path] = useState(route.params.poster_path)
    const [popularity, setPopularity] = useState(route.params.popularity)
    const [tags, setTags] = useState(route.params.tags.join(', '))
    const { param } = route.params
    
    const [editMovie] = useMutation(EDIT_MOVIE, {
        update(cache, { data: { editMovie } }) {
            const { getMovies } = cache.readQuery({ query: ALL_MOVIE })
            cache.writeQuery({
                query: ALL_MOVIE,
                data: { getMovies: getMovies.map(el => (el._id === _id) ? editMovie : el) }
            })
        }
    })

    const [editTv] = useMutation(EDIT_TV, {
        update(cache, { data: { editTv } }) {
            const { getTv } = cache.readQuery({ query: ALL_TV })
            cache.writeQuery({
                query: ALL_TV,
                data: { getTv: getTv.map(el => (el._id === _id) ? editTv : el) }
            })
        }
    })

    const handleOnSubmit = () => {
        if (param === 'Movie') {
            editMovie({ variables: {
                _id, title, overview, poster_path, popularity: +popularity, tags
            } })
            navigation.navigate('Movie')
        } else if (param === 'Tv') {
            editTv({ variables: {
                _id, title, overview, poster_path, popularity: +popularity, tags
            } })
            navigation.navigate('Tv')
        }
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
                value={popularity.toString()}
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
                    title="EDIT"
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

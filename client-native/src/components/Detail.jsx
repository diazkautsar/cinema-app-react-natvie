import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Button
} from 'react-native'
import { DELETE_MOVIE, ALL_MOVIE, DELETE_TV, ALL_TV } from '../Apollo/query/index'
import { useMutation } from '@apollo/react-hooks'

export default function Detail({ navigation, route }) {
    const { title } = route.params
    const { _id } = route.params
    const { popularity } = route.params
    const { overview } = route.params
    const { poster_path } = route.params
    const { tags } = route.params
    const { param } = route.params

    const [deleteMovie] = useMutation(DELETE_MOVIE, {
        update(cache, { data: { deleteMovie } }) {
            const { getMovies } = cache.readQuery({ query: ALL_MOVIE })
            cache.writeQuery({
                query: ALL_MOVIE,
                data: { getMovies: getMovies.filter(movie => movie._id !== _id) }
            })
        }
    })

    const [deleteTv] = useMutation(DELETE_TV, {
        update(cache, { data: { deleteTv } }) {
            const { getTv } = cache.readQuery({ query: ALL_TV })
            cache.writeQuery({
                query: ALL_TV,
                data: { getTv: getTv.filter(tv => tv._id !== _id) }
            })
        }
    })

    const handleDelete = () => {
        if (param === 'Movie') {
            deleteMovie({ variables: { _id: _id } })
            navigation.navigate('Movie')
        } else if (param === 'Tv') {
            deleteTv({ variables: { _id: _id } })
            navigation.navigate('Tv')
        }
    }

    const handleEdit = () => {
        navigation.navigate("Edit", {
            title, _id, popularity, poster_path, overview, tags, param
        })
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text>{title}</Text>
            </View>
            <Image
                style={styles.image}
                source={{ uri: `${poster_path}`, height: 400, width: 300 }}
            />
            <View style={{ alignItems: 'center' }}>
                <Text>{popularity}</Text>
                <Text>{overview}</Text>
                <Text>{tags.join(", ")}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <View style={{ margin: 10 }}>
                    <Button
                        title="Delete"
                        onPress={handleDelete}
                    />
                </View>
                <View style={{ margin: 10 }}>
                    <Button
                        title="Edit"
                        onPress={handleEdit}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        margin: 10,
        alignItems: "center",
        justifyContent: "center"
    }
})
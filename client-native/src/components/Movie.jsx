import React, { useState } from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    Button,
    TouchableHighlight,
    Alert
} from 'react-native'

import { useQuery } from '@apollo/react-hooks'
import { ALL_MOVIE } from '../Apollo/query/index'

import Loading from './Loading'

export default function Movie({ navigation, route }) {
    const { loading, error, data } = useQuery(ALL_MOVIE)
    const { param } = route.params
    
    const handlerAdd = (param) => {
        navigation.navigate('Form', {
            param
        })
    }

    const handlerToDetail = (detail) => {
        navigation.navigate('Detail', {
            _id: detail._id,
            title: detail.title,
            overview: detail.overview,
            popularity: detail.popularity,
            poster_path: detail.poster_path,
            tags: detail.tags,
            param
        })
    }

    if (loading || !data) return <Loading />

    return (
        <View style={{ backgroundColor: '#fff' }}>
            <View style={{
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10
            }}>
                <Button
                    title={`ADD ${param}`}
                    onPress={() => handlerAdd(param)}
                />
            </View>
            <ScrollView horizontal={true} style={styles.container}>
                {data.getMovies.map(el => (
                    <View style={{ marginTop: 10 }} key={el._id}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>{el.title}</Text>
                        </View>
                        <Image
                            style={styles.image}
                            key={el._id}
                            source={{ uri: `${el.poster_path}`, height: 400, width: 300 }}
                        />
                        <View style={{ alignItems: 'center' }}>
                            <Button 
                            title="DETAIL"
                            onPress = {() => handlerToDetail(el)}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    image: {
        margin: 10,
        alignItems: "center",
        justifyContent: "center"
    }
})
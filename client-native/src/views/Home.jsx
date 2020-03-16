import React from 'react';
import {
    StyleSheet,
    View,
    Button
} from 'react-native'

export default function Home({ navigation }) {
    const handlerChangePage = (param) => {
        navigation.navigate(param, {
            param
        })
    }

    return (
        <View style={styles.container}>
            <View style={{ margin: 10 }}>
                <Button 
                title="MOVIE LIST"
                onPress={() => handlerChangePage("Movie")}
                />
            </View>
            <View>
                <Button 
                title="TV SERIES LIST"
                onPress={() => handlerChangePage('Tv')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
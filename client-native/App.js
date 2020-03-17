import 'react-native-gesture-handler'
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import client from './src/Apollo/client'
import Home from './src/views/Home'
import Movie from './src/components/Movie'
import Tv from './src/components/Tvseries'
import Form from './src/components/Form'
import Detail from './src/components/Detail'
import Edit from './src/components/Edit'

const Stack = createStackNavigator()

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Movie" component={Movie} />
          <Stack.Screen name="Tv" component={Tv} />
          <Stack.Screen name="Form" component={Form} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="Edit" component={Edit} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

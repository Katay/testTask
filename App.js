/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListScreen from './src/screen/List';
import DetailedScreen from './src/screen/Detailed';
// import store from './src/store';

const App = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: 'Videos' }} />
        <Stack.Screen name="DetailedScreen" component={DetailedScreen} options={{ title: 'Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

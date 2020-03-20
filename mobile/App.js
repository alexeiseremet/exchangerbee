/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react';
import 'react-native-gesture-handler';

// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './features/Home/Screen'
import CatalogScreen from './features/Catalog/Screen';
import ProductListScreen from './features/ProductList/Screen';
import ProductScreen from './features/Product/Screen';

const TabBottom = createBottomTabNavigator();
const Stack = createStackNavigator();

const CatalogStack = () => (
  <Stack.Navigator initialRouteName="Index">
    <Stack.Screen name="Catalog" component={CatalogScreen} />
    <Stack.Screen name="ProductList" component={ProductListScreen} />
    <Stack.Screen name="Product" component={ProductScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />

      <NavigationContainer>
        <TabBottom.Navigator initialRouteName="Home" resetOnBlur={true}>
          <TabBottom.Screen name="Home" component={HomeScreen} />
          <TabBottom.Screen name="Catalog" component={CatalogStack} options={{ title: 'Catalog' }} />
        </TabBottom.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

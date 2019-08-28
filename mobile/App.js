import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import HomeScreen from './features/HomeScreen'
import CatalogScreen from './features/Catalog/Screen'
import ProductListScreen from './features/ProductList/Screen';
import ProductScreen from './features/Product/Screen';

const CatalogStack = createStackNavigator(
  {
    Index: CatalogScreen,
    ProductList: ProductListScreen,
    Product: ProductScreen,
  },
  {
    initialRouteName: 'Index',
  }
);


const AppNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Catalog: {
      screen: CatalogStack,
      navigationOptions: {
        title: 'Catalog',
      },
    },
  },
  {
    initialRouteName: 'Home',
    resetOnBlur: true,
  }
);

export default createAppContainer(AppNavigator);

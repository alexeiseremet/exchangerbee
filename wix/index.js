/**
 * @format
 */

import React from 'react';
import { Navigation } from "react-native-navigation";
import HomeScreen from './features/HomeScreen';
import CatalogScreen from './features/Catalog/Screen';
import ProductListScreen from './features/ProductList/Screen';
import ProductScreen from './features/Product/Screen';

Navigation.registerComponent(`HomeScreen`, () => HomeScreen);
Navigation.registerComponent(`CatalogScreen`, () => CatalogScreen);
Navigation.registerComponent(`ProductListScreen`, () => ProductListScreen);
Navigation.registerComponent(`ProductScreen`, () => ProductScreen);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#d71440'
      },
      title: {
        color: 'white',
      },
      backButton: {
        title: '', // Remove previous screen name from back button
        color: 'white'
      },
      buttonColor: 'white',
    },
    statusBar: {
      style: 'light'
    },
    layout: {
      orientation: ['portrait']
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
    },
    bottomTab: {
      textColor: 'gray',
      selectedTextColor: 'black',
      iconColor: 'gray',
      selectedIconColor: 'black',
    }
  });

  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            component: {
              id: 'HomeScreen',
              name: 'HomeScreen',
              options: {
                bottomTab: {
                  text: 'Acasa',
                }
              }
            }
          },
          {
            stack: {
              children: [{
                component: {
                  id: 'CatalogScreen',
                  name: 'CatalogScreen',
                  options: {
                    bottomTab: {
                      text: 'Catalog',
                    },
                    topBar: {
                      visible: false,
                    },
                  }
                }
              }]
            },
          }
        ],
      }
    }
  });
});



/**
 * @format
 */

import React from 'react';
import { Navigation } from "react-native-navigation";
import HomeScreen from './features/HomeScreen';
import CatalogScreen from './features/Catalog/Screen';
import ProductScreen from './features/Product/Screen';

Navigation.registerComponent(`HomeScreen`, () => HomeScreen);
Navigation.registerComponent(`CatalogScreen`, () => CatalogScreen);
Navigation.registerComponent(`ProductScreen`, () => ProductScreen);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#039893'
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
              name: 'HomeScreen',
              options: {
                bottomTab: {
                  text: 'Acasa',
                }
              }
            }
          },
          {
            component: {
              name: 'CatalogScreen',
              options: {
                bottomTab: {
                  text: 'Catalog',
                }
              }
            }
          },
        ],
      }
    }
  });
});



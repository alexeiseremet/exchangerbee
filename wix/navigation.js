/**
 * @format
 */

import { Navigation } from "react-native-navigation";

export function pushProductListScreenApp() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'ProductListScreen',
          }
        }]
      }
    }
  });
}



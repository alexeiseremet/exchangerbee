import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import Menu from './Menu';
import { Navigation } from 'react-native-navigation';

class CatalogScreen extends React.Component {
  componentDidAppear() {
    console.log('==============' , 'DidAppear');

    // try {
    //   const res = await fetch('https://fenrir.altex.ro/promo/campaign/854/categories');
    //   const resJSON = await res.json();
    //
    //   this.setState({
    //     items: resJSON.categories,
    //     isLoading: false,
    //   });
    //
    //   console.log(resJSON);
    // }
    // catch (error) {
    //   // eslint-disable-next-line no-console
    //   console.error(error);
    // }
  }
  render() {
    return (
      <ScrollView
        // centerContent
        style={{ backgroundColor: '#eaeaea' }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Catalog oferte</Text>
          <Text style={styles.sectionDescription}>
            Electronice si electrocasnice online la cel mai mic pret.
          </Text>
        </View>

        <Menu/>
      </ScrollView>
    )
  };
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
  }
});

export default CatalogScreen;

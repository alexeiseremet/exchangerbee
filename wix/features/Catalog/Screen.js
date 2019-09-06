import React from 'react';
import { Navigation } from 'react-native-navigation';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import Menu from './Menu';

class CatalogScreen extends React.Component {
  componentDidMount() {
    Navigation.events().registerBottomTabSelectedListener(({ selectedTabIndex }) => {
      console.log('pppppppp', selectedTabIndex)
    });
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

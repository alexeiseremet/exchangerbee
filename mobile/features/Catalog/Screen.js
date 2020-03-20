import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Menu from './Menu';

const CatalogScreen = () => {
  return (
    <View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Catalog oferte</Text>
        <Text style={styles.sectionDescription}>
          Electronice si electrocasnice online la cel mai mic pret.
        </Text>
      </View>

      <Menu/>
    </View>
  )
};

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

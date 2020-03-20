import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CatalogMenuItem = ({ slug, name }) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      onPress={() => { navigation.navigate('ProductList', { name, slug }) }}
      underlayColor="#dadada"
    >
      <View style={styles.item}>
        <Text>{name}</Text>
      </View>
    </TouchableHighlight>
  )
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 5,
    fontSize: 18,
  },
});

export default CatalogMenuItem;

import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Item = ({ categorySlug, slug, name, subcategories }) => {
  const navigation = useNavigation();

  if (subcategories) {
    return null;
  }

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate('ProductList', { name, slug: `${categorySlug}/${slug}` })
      }}
      underlayColor="#dadada"
    >
      <View style={styles.subItem}>
        <Text>{name}</Text>
      </View>
    </TouchableHighlight>
  )
};

const CatalogMenuItem = ({ slug, name, subcategories }) => {
  return (
    <View style={styles.item}>
      <Text style={{ color: '#999', textTransform: 'uppercase', fontSize: 12}}>
        {name}
      </Text>

      <FlatList
        data={subcategories}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <Item categorySlug={slug} {...item}/>}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 24,
    paddingVertical: 5,
    fontSize: 18,
  },
  subItem: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 5,
  }
});


export default CatalogMenuItem;

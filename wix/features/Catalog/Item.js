import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View,
} from 'react-native';

const CatalogMenuItem = ({ id, name, properties }) => (
  <TouchableHighlight
    onPress={() => ({ routeName: 'ProductList', params: { name, categoryId: id } })}
    underlayColor="#dadada"
  >
    <View style={styles.item}>
      <View>
        <Image
          style={{ width: 32, height: 32 }}
          source={{ uri: `https://cdna.altex.ro${properties.icon_image}` }}
        />
      </View>
      <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', paddingLeft: 10 }}>
        <Text>{name}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 5,
    fontSize: 18,
  },
});

export default CatalogMenuItem

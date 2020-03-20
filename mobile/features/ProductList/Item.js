import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductListItem = ({ image, name, sku }) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate('Product', { name, sku })
      }}
    >
      <View style={styles.item}>
        <View>
          <Image
            style={{ width: 64, height: 64 }}
            source={{ uri: `https://lcdn.altex.ro${image}` }}
          />
        </View>
        <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', paddingLeft: 10 }}>
          <Text>{name}</Text>
          <Text style={{ marginTop: 5, color: '#8c8c8c' }}>{sku}</Text>
        </View>
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

export default ProductListItem;

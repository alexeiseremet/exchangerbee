import React from 'react';
import { Navigation } from 'react-native-navigation'
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View,
} from 'react-native';

const onClickPush = async (props) => {
  await Navigation.push('CatalogScreen', {
    component: {
      name: 'ProductScreen',
      passProps: props,
      options: {
        topBar: {
          title: {
            text: props.name
          },
        }
      }
    }
  });
};

const ProductListItem = ({ image, name, sku }) => (
  <TouchableHighlight
    onPress={() => {
      onClickPush({ name, productSku: sku })
    }}
    underlayColor="#eaeaea">
    <View style={styles.item}>
      <View>
        <Image
          style={{ width: 64, height: 64 }}
          source={{ uri: `https://cdna.altex.ro${image}` }}
        />
      </View>
      <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', paddingLeft: 10 }}>
        <Text>{name}</Text>
        <Text style={{ marginTop: 5, color: '#8c8c8c' }}>{sku}</Text>
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

export default ProductListItem

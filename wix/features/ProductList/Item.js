import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';

const ProductListItem = ({ image, name, sku, navigation }) => (
  <TouchableHighlight
    onPress={() => {
      navigation.navigate({ routeName: 'Product', params: { name, productSku: sku } })
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

export default withNavigation(ProductListItem)

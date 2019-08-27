import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View,
} from 'react-native';

const CatalogItem = ({ name, properties }) => (
  <TouchableHighlight onPress={() => ({})} underlayColor="#dadada">
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

class CatalogList extends Component {
  state = {
    items: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const res = await fetch('https://fenrir.altex.ro/promo/campaign/838/categories');
      const resJSON = await res.json();

      this.setState({
        items: resJSON.categories,
        isLoading: false,
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  render() {
    const { items, isLoading } = this.state;

    return (
      <View style={styles.container}>
        {
          isLoading
            ? <ActivityIndicator size="large"/>
            : (
              <FlatList
                data={items}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => (
                  <CatalogItem {...item}/>
                )}
              />
            )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 5,
    fontSize: 18,
  },
});

export default CatalogList

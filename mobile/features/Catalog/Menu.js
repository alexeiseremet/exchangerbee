import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
} from 'react-native';
import CatalogMenuItem from './Item';

class CatalogMenu extends React.Component {
  state = {
    items: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const res = await fetch('https://fenrir.altex.ro/promo/campaign/oferte-catalog/?include_products=1');
      const resJSON = await res.json();

      this.setState({
        items: resJSON.tree,
        isLoading: false,
      });
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  render() {
    const { items, isLoading } = this.state;

    return (
      <View>
        {
          isLoading
            ? <ActivityIndicator size="large"/>
            : (
              <FlatList
                data={items}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => (
                  <CatalogMenuItem {...item}/>
                )}
              />
            )
        }
      </View>
    );
  }
}

export default CatalogMenu

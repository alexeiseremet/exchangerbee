import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
} from 'react-native';
import ProductListItem from './Item';

class ProductListScreen extends React.Component {
  state = {
    products: [],
    isLoading: true,
  };

  async componentDidMount() {
    const { slug } = this.props.route.params;

    try {
      const res = await fetch(`https://fenrir.altex.ro/promo/campaign/oferte-catalog/${slug}/`);
      const resJSON = await res.json();

      this.setState({
        products: resJSON.products,
        isLoading: false,
      });
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  render() {
    const { products, isLoading } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {
          isLoading
            ? <ActivityIndicator size="large"/>
            : (
              <FlatList
                data={Object.keys(products).map(key => products[key])}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => <ProductListItem {...item}/>}
              />
            )
        }
      </View>
    );
  }
}

export default ProductListScreen

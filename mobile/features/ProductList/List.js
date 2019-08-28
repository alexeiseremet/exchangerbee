import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
} from 'react-native';
import ProductListItem from './Item';

class ProductList extends React.Component {
  state = {
    items: [],
    isLoading: true,
  };

  async componentDidMount() {
    const { categoryId } = this.props;

    try {
      const res = await fetch(`https://fenrir.altex.ro/promo/category/${categoryId}/products/`);
      const resJSON = await res.json();

      this.setState({
        items: resJSON.category.products,
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
      <View>
        {
          isLoading
            ? <ActivityIndicator size="large"/>
            : (
              <FlatList
                data={items}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => (
                  <ProductListItem {...item}/>
                )}
              />
            )
        }
      </View>
    );
  }
}

export default ProductList

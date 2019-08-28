import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
} from 'react-native';

class ProductDetail extends React.Component {
  state = {
    items: [],
    isLoading: true,
  };

  async componentDidMount() {
    const { productSku } = this.props;

    try {
      const res = await fetch(`https://fenrir.altex.ro/catalog/product/${productSku}`);
      const resJSON = await res.json();

      this.setState({
        data: resJSON.product,
        isLoading: false,
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View>
        {
          isLoading
            ? <ActivityIndicator size="large"/>
            : (
              <View><Text>{JSON.stringify(data.gallery)}</Text></View>
            )
        }
      </View>
    );
  }
}

export default ProductDetail

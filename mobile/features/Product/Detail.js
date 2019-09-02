import React from 'react';
import {
  ActivityIndicator,
  Image,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

class ProductDetail extends React.Component {
  state = {
    items: [],
    isLoading: true,
    viewport: {
      width: Dimensions.get('window').width,
    }
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
    const { data, isLoading, viewport} = this.state;

    return (
      <View>
        {
          isLoading
            ? <ActivityIndicator size="large"/>
            : (
              <>
                <Carousel
                  data={data.gallery}
                  renderItem={({ item }) => (
                    <View style={{ marginTop: 20 }}>
                      <Image
                        style={{ width: viewport.width - 48, height: viewport.width - 48 }}
                        source={{ uri: `https://cdna.altex.ro${item.file}` }}
                      />
                    </View>
                  )}
                  sliderWidth={viewport.width - 48}
                  itemWidth={viewport.width - 48}
                />

                <View style={{ marginTop: 20 }}>
                  <Text>{data.short_description}</Text>
                </View>
              </>
            )
        }
      </View>
    );
  }
}

export default ProductDetail

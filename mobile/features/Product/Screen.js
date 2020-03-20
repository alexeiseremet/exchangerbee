import React from 'react';
import {
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  View,
  Image,
  Text,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { WebView } from 'react-native-webview';

class ProductDetail extends React.Component {
  state = {
    items: [],
    isLoading: true,
    viewport: {
      width: Dimensions.get('window').width,
    }
  };

  async componentDidMount() {
    const { sku } = this.props.route.params;

    try {
      const res = await fetch(`https://fenrir.altex.ro/catalog/product/${sku}/`);
      const resJSON = await res.json();

      this.setState({
        product: resJSON.product,
        isLoading: false,
      });
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  render() {
    const { product, isLoading, viewport } = this.state;
    const { name } = this.props.route.params;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: '600' }}>{name}</Text>

        <View>
          {
            isLoading
              ? <ActivityIndicator size="large"/>
              : (
                <>
                  <Carousel
                    data={product.gallery}
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
                </>
              )
          }
        </View>

        {
          !isLoading && (
            <View style={{ flex: 1 }}>
              <WebView
                style={{ width: viewport.width }}
                originWhitelist={['*']}
                domStorageEnabled={true}
                mixedContentMode="always"
                source={{ html: `
                  <div id="flix-minisite"></div>
                  <div id="flix-inpage" style="font-size: 4rem"></div>
                  <div class="flixMediaContentFallback" style="font-size: 3rem;">Masina de spalat rufe frontala SAMSUNG WW80J5345FW/LE, EcoBubble, 1200rpm, 8kg, A+++, alb</div>
                  <script type="text/javascript" src="https://media.flixfacts.com/js/loader.js" data-flix-distributor="5828" data-flix-language="ro" data-flix-brand="SAMSUNG" data-flix-ean="8806088732527" data-flix-button="flix-minisite" data-flix-inpage="flix-inpage" async=""></script>
                  <style>
                    .flixMediaContentFallback {
                      display: none;
                    }
                    #flix-inpage:empty + .flixMediaContentFallback {
                      display:block;
                    }
                  </style>
                ` }}
              />
            </View>
          )
        }
      </SafeAreaView>
    );
  }
}

export default ProductDetail

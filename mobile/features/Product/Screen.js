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
      const res = await fetch(`https://fenrir.altex.ro/catalog/product/MSFF2J5HY4W`);
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

        {/*<View>*/}
        {/*  {*/}
        {/*    isLoading*/}
        {/*      ? <ActivityIndicator size="large"/>*/}
        {/*      : (*/}
        {/*        <>*/}
        {/*          <Carousel*/}
        {/*            data={product.gallery}*/}
        {/*            renderItem={({ item }) => (*/}
        {/*              <View style={{ marginTop: 20 }}>*/}
        {/*                <Image*/}
        {/*                  style={{ width: viewport.width - 48, height: viewport.width - 48 }}*/}
        {/*                  source={{ uri: `https://cdna.altex.ro${item.file}` }}*/}
        {/*                />*/}
        {/*              </View>*/}
        {/*            )}*/}
        {/*            sliderWidth={viewport.width - 48}*/}
        {/*            itemWidth={viewport.width - 48}*/}
        {/*          />*/}
        {/*        </>*/}
        {/*      )*/}
        {/*  }*/}
        {/*</View>*/}

        {
          !isLoading && (
            <View aspectRatio={16/9}>
              <WebView
                style={{ width: viewport.width, height: 400 }}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ html: `
<div id="flix-minisite" style="font-size: 2rem"></div>
<div id="flix-inpage" style="font-size: 2rem"></div>
<div class="flixMediaContentFallback" style="font-size: 3rem;">
  <div>Masina de spalat rufe frontala LG F2J5WN7S, Direct Drive, 6.5kg, 1200rpm, A+++, inox</div>
</div>

<style>
  .flixMediaContentFallback {
    display: none
  }

  #flix-inpage:empty + .flixMediaContentFallback {
    display:block
  }
</style>
<script type="text/javascript" src="https://media.flixfacts.com/js/loader.js" data-flix-distributor="5828" data-flix-language="ro" data-flix-brand="SAMSUNG" data-flix-ean="8806088736631" data-flix-button="flix-minisite" data-flix-inpage="flix-inpage" async=""></script>
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

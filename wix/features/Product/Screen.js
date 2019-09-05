import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import Detail from './Detail'

class ProductScreen extends React.Component {
  render() {
    return (
      <ScrollView
        // centerContent
        style={{ backgroundColor: '#e1e1e1' }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {this.props.params.name}
          </Text>

          <Detail productSku={this.props.params.productSku}/>
        </View>
      </ScrollView>
    )
  };
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default ProductScreen;

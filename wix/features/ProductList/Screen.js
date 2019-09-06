import React from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import List from './List'

class ProductListScreen extends React.Component {
  render() {
    return (
      <ScrollView
        // centerContent
        style={{ backgroundColor: '#e1e1e1' }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <List categoryId={this.props.categoryId}/>
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

export default ProductListScreen;

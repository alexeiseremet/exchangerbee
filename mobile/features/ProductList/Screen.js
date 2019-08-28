import React from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import List from './List'

class ProductListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`
  });

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView
        // centerContent
        style={{ backgroundColor: '#e1e1e1' }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <List categoryId={navigation.state.params.categoryId}/>
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

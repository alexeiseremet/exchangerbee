import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import CatalogList from './CatalogList'

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Acasa',
    headerRight: (
      <Button
        onPress={() => navigation.navigate('Catalog')}
        title="Catalog"
      />
    ),
  });

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

class CatalogScreen extends React.Component {
  static navigationOptions = {
    title: 'Oferte',
  };

  render() {
    return (
      <ScrollView
        // centerContent
        style={{ backgroundColor: '#eaeaea' }}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Catalog oferte</Text>
          <Text style={styles.sectionDescription}>
            Electronice si electrocasnice online la cel mai mic pret.
          </Text>
        </View>

        <CatalogList/>
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
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Catalog: CatalogScreen,
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);

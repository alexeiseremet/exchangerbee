import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Acasa',
    headerRight: (
      <Button
        onPress={() => ({})}
        title="Hi!"
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

export default HomeScreen;

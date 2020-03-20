import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const Screen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        originWhitelist={['https://*']}
        source={{ uri: 'https://altex.ro/' }}
      />
    </SafeAreaView>
  )
};

export default Screen;

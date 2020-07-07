import React from 'react';
import {Header, ThemedView} from 'src/components';
import {IconHeader, Logo, CartIcon} from 'src/containers/HeaderComponent';
import {WebView} from 'react-native-webview';

export default class Livesupport extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ThemedView style={{flex: 1}}>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<Logo />}
          rightComponent={<CartIcon />}
        />
        <WebView
          source={{
            uri: 'https://www.tidio.com/talk/y22mcoo3zgkjdccp8xd6trw65pladmrv',
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </ThemedView>
    );
  }
}

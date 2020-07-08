import React from 'react';
import {View, Modal} from 'react-native';
import {Header, ThemedView} from 'src/components';
import {IconHeader, Logo, CartIcon} from 'src/containers/HeaderComponent';
import {WebView} from 'react-native-webview';
import {homeTabs} from 'src/config/navigator';

export default class Livesupport extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{flex: 1}}>
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
      </View>
    );
  }
}

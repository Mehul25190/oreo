import React from 'react';

import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';

import {
  ScrollView,
  View,
  Dimensions,
  Linking,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import {ThemedView, Header} from 'src/components';
import {IconHeader, Logo, CartIcon} from 'src/containers/HeaderComponent';
import ModalHomePopup from 'src/containers/ModalHomePopup';
import ActionButton from 'react-native-action-button';
// Icon from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-elements';
import {WebView} from 'react-native-webview';

import {
  dataConfigSelector,
  toggleSidebarSelector,
} from 'src/modules/common/selectors';

// Containers
import Slideshow from './home/containers/Slideshow';
import CategoryList from './home/containers/CategoryList';
import ProductList from './home/containers/ProductList';
import ProductCategory from './home/containers/ProductCategory';
import Banners from './home/containers/Banners';
import TextInfo from './home/containers/TextInfo';
import CountDown from './home/containers/CountDown';
import BlogList from './home/containers/BlogList';
import Testimonials from './home/containers/Testimonials';
import Button from './home/containers/Button';
import Vendors from './home/containers/Vendors';
import Search from './home/containers/Search';
import Divider from './home/containers/Divider';
import {profileStack} from 'src/config/navigator';

const {width} = Dimensions.get('window');

const containers = {
  slideshow: Slideshow,
  categories: CategoryList,
  products: ProductList,
  productcategory: ProductCategory,
  banners: Banners,
  text: TextInfo,
  countdown: CountDown,
  blogs: BlogList,
  testimonials: Testimonials,
  button: Button,
  vendors: Vendors,
  search: Search,
  divider: Divider,
};

const widthComponent = spacing => {
  if (!spacing) {
    return width;
  }
  const marginLeft =
    spacing.marginLeft && parseInt(spacing.marginLeft)
      ? parseInt(spacing.marginLeft)
      : 0;
  const marginRight =
    spacing.marginRight && parseInt(spacing.marginRight)
      ? parseInt(spacing.marginRight)
      : 0;
  const paddingLeft =
    spacing.paddingLeft && parseInt(spacing.paddingLeft)
      ? parseInt(spacing.paddingLeft)
      : 0;
  const paddingRight =
    spacing.paddingRight && parseInt(spacing.paddingRight)
      ? parseInt(spacing.paddingRight)
      : 0;
  return width - marginLeft - marginRight - paddingLeft - paddingRight;
};

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      Livesupport: false,
      show: false,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({show: true});
    }, 3000);
  }
  renderContainer(config) {
    console.log('test', config);
    const Container = containers[config.type];
    if (!Container) {
      return null;
    }
    return (
      <View key={config.id} style={config.spacing && config.spacing}>
        <Container
          {...config}
          widthComponent={widthComponent(config.spacing)}
        />
      </View>
    );
  }
  // LiveSupportChat() {
  //   //this.setState({Livesupport: true});
  //   this.props.navigation.navigate(profileStack.livesupport, {
  //     name: 'homeTabs.home',
  //   });
  // }

  sendOnWhatsApp = () => {
    let msg = 'I wanna discuse about Your product.';
    let mobile = 703315545;
    if (mobile) {
      if (msg) {
        let url = 'whatsapp://send?text=' + msg + '&phone=256' + mobile;
        Linking.openURL(url)
          .then(data => {
            console.log('WhatsApp Opened');
          })
          .catch(() => {
            alert('Make sure Whatsapp installed on your device');
          });
      } else {
        alert('Please insert message to send');
      }
    } else {
      alert('Please insert mobile no');
    }
  };

  makeCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:+256392175511';
    } else {
      phoneNumber = 'telprompt:+256392175511';
    }
    Linking.openURL(phoneNumber);
  };

  render() {
    // const { category, product } = this.props;
    const {config, toggleSidebar, navigation, goPhone} = this.props;

    return (
      <ThemedView isFullView>
        <Header
          leftComponent={
            //   this.state.Livesupport ? (
            //     <IconHeader
            //       name="home"
            //       size={22}
            //       onPress={() => this.setState({Livesupport: false})}
            //     />
            //   ) : null
            toggleSidebar ? (
              <IconHeader
                name="align-left"
                size={22}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            ) : null
          }
          centerComponent={<Logo />}
          rightComponent={<CartIcon />}
        />
        {/* {this.state.Livesupport ? (
          <WebView
            source={{
              uri:
                'https://www.tidio.com/talk/y22mcoo3zgkjdccp8xd6trw65pladmrv',
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        ) : ( */}
        <View style={{flex: 1}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {config.map(config => this.renderContainer(config))}
          </ScrollView>
          {this.state.show ? <ModalHomePopup /> : null}
          <ActionButton buttonColor="rgba(231,76,60,1)">
            {/* <ActionButton.Item
                buttonColor="#6c133a"
                title="Live Support"
                onPress={() => this.LiveSupportChat()}>
                <Image
                  source={require('../assets/images/live-chat.png')}
                  style={styles.supportactionButtonIcon}
                />
              </ActionButton.Item> */}
            <ActionButton.Item
              buttonColor="#1abc9c"
              title="WhatsApp"
              onPress={this.sendOnWhatsApp}>
              <Image
                source={require('../assets/images/whatsapp.png')}
                style={styles.whatsappactionButtonIcon}
              />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#3498db"
              title="Call Me"
              onPress={this.makeCall}>
              <Image
                source={require('../assets/images/call.png')}
                style={styles.actionButtonIcon}
              />
            </ActionButton.Item>
          </ActionButton>
        </View>
        {/* )} */}
      </ThemedView>
    );
  }
}

const mapStateToProps = state => {
  return {
    config: dataConfigSelector(state),
    toggleSidebar: toggleSidebarSelector(state),
  };
};

export default connect(mapStateToProps)(HomeScreen);
const styles = StyleSheet.create({
  actionButtonIcon: {
    height: 20,
    width: 20,
    tintColor: '#fff',
  },
  whatsappactionButtonIcon: {
    height: 27,
    width: 27,
    tintColor: '#fff',
  },
  supportactionButtonIcon: {
    height: 34,
    width: 34,
    tintColor: '#fff',
  },
});

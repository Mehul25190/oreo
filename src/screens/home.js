import React from 'react';

import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';

import {
  ScrollView,
  View,
  Dimensions,
  Linking,
  Image,
  StyleSheet,
} from 'react-native';

import {ThemedView, Header} from 'src/components';
import {IconHeader, Logo, CartIcon} from 'src/containers/HeaderComponent';
import ModalHomePopup from 'src/containers/ModalHomePopup';
import ActionButton from 'react-native-action-button';
// Icon from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-elements';

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
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {config.map(config => this.renderContainer(config))}
        </ScrollView>
        <ModalHomePopup />
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="WhatsApp"
            onPress={this.sendOnWhatsApp}>
            {/* <Icon
              name="logo-whatsapp"
              type="ionicons"
              style={styles.actionButtonIcon}
            /> */}
            <Image
              source={require('../assets/images/whatsapp.png')}
              style={styles.whatsappactionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Call Me"
            onPress={this.makeCall}>
            {/* <Icon
              name="call-out"
              type="SimpleLineIcons"
              style={styles.actionButtonIcon}
            /> */}
            <Image
              source={require('../assets/images/call.png')}
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
        </ActionButton>
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
    height: 36,
    width: 36,
    tintColor: '#fff',
  },
  whatsappactionButtonIcon: {
    height: 45,
    width: 45,
    tintColor: '#fff',
  },
});

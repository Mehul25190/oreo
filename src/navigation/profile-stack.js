import {profileStack} from 'src/config/navigator';

import {createStackNavigator} from 'react-navigation-stack';

import MeScreen from 'src/screens/profile/me';
import SettingScreen from 'src/screens/profile/setting';
import HelpScreen from 'src/screens/profile/help';
import Livesupport from 'src/screens/profile/livesupport';
import PrivacyScreen from 'src/screens/profile/privacy';
import ContactScreen from 'src/screens/profile/contact';
import AboutScreen from 'src/screens/profile/about';
import AccountScreen from 'src/screens/profile/account';
import ChangePasswordScreen from 'src/screens/profile/change-password';
import AddressBookScreen from 'src/screens/profile/address-book';
import OrderList from 'src/screens/profile/orders';
import OrderDetail from 'src/screens/profile/order';
import NotificationList from 'src/screens/profile/notifications';
import NotificationDetail from 'src/screens/profile/notification';
import DemoConfig from 'src/screens/profile/demo-config';
import Vendors from 'src/screens/profile/vendors';
import ChatVendor from 'src/screens/profile/chat-vendor';
import EditAccount from 'src/screens/profile/edit-account';

export default createStackNavigator(
  {
    [profileStack.me]: MeScreen,
    [profileStack.setting]: SettingScreen,
    [profileStack.help]: HelpScreen,
    [profileStack.livesupport]: Livesupport,
    [profileStack.privacy]: PrivacyScreen,
    [profileStack.contact]: ContactScreen,
    [profileStack.about]: AboutScreen,
    [profileStack.account]: AccountScreen,
    [profileStack.change_password]: ChangePasswordScreen,
    [profileStack.address_book]: AddressBookScreen,
    [profileStack.order_list]: OrderList,
    [profileStack.order_detail]: OrderDetail,
    [profileStack.notification_list]: NotificationList,
    [profileStack.notification_detail]: NotificationDetail,
    [profileStack.demo_config]: DemoConfig,
    [profileStack.vendors]: Vendors,
    [profileStack.chat_vendor]: ChatVendor,
    [profileStack.edit_account]: EditAccount,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

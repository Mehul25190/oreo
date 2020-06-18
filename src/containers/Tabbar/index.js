import React from 'react';

import {connect} from 'react-redux';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text, SafeAreaView} from 'src/components';
import IconTabbar from './IconTabbar';

import {homeTabs} from 'src/config/navigator';

import {configsSelector} from 'src/modules/common/selectors';

import {grey5} from 'src/components/config/colors';
import {sizes} from 'src/components/config/fonts';
import {padding} from 'src/components/config/spacing';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const Tabbar = props => {
  const {
    configs,
    screenProps: {t, theme},
    navigation,
  } = props;
  const data = [
    {
      iconName: 'home',
      name: t('common:text_home'),
      router: homeTabs.home,
      isShow: true,
    },
    {
      iconName: 'search',
      name: t('common:text_shop'),
      router: homeTabs.shop,
      isShow: true,
    },
    {
      iconName: 'heart',
      name: t('common:text_wishList'),
      nameData: 'wishList',
      router: homeTabs.wish_list,
      isShow: configs.get('toggleWishlist'),
    },
    {
      iconName: 'shopping-bag',
      name: t('common:text_cart'),
      nameData: 'cart',
      router: homeTabs.cart,
      isShow: configs.get('toggleCheckout'),
    },
    {
      iconName: 'user',
      name: t('common:text_me'),
      router: homeTabs.me,
      iconProps: {
        size: 23,
      },
      isShow: true,
    },
  ];

  return (
    <View>
      <View
        style={{
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
         padding:31,
         backgroundColor: 'transparent'
       
        }}>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          {/*Inner options of the action button*/}
          {/*Icons here https://infinitered.github.io/ionicons-version-3-search/*/}
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Add to Watch Later"
            onPress={() => alert('Added to watch later')}>
            <Icon name="md-eye" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Add to Favourite"
            onPress={() => alert('Added to favourite')}>
            <Icon name="md-star" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Share"
            onPress={() => alert('Share Post')}>
            <Icon name="md-share-alt" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
      <SafeAreaView
        forceInset={{bottom: 'always'}}
        style={[styles.container, theme.TabNavigator.tabStyle]}>
        {data.map((tab, index) =>
          tab.isShow ? (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => navigation.navigate(tab.router)}>
              <IconTabbar
                name={tab.iconName}
                color={
                  navigation.state.index === index
                    ? theme.colors.primary
                    : grey5
                }
                nameData={tab.nameData}
                {...tab.iconProps}
              />
              <Text
                medium
                style={[
                  styles.text,
                  {
                    color:
                      navigation.state.index === index
                        ? theme.colors.primary
                        : grey5,
                  },
                ]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ) : null,
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: padding.small - 1,
  },
  text: {
    fontSize: sizes.h6 - 2,
    lineHeight: 15,
    marginTop: 5,
  },
});

const mapStateToProps = state => {
  return {
    configs: configsSelector(state),
  };
};

export default connect(mapStateToProps)(Tabbar);

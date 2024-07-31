import {View} from 'react-native';
import React from 'react';
import FooterTabs from './FooterTabs';

const FooterMenu = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <FooterTabs tab={'Home'} icon={'house'} />
      <FooterTabs tab={'Post'} icon={'square-plus'} />
      <FooterTabs tab={'My Post'} icon={'list'} />
      <FooterTabs tab={'Account'} icon={'user'} />
    </View>
  );
};

export default FooterMenu;

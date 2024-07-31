import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const FooterTabs = ({tab, icon}) => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <TouchableOpacity
      style={{
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
      onPress={() => navigation.navigate(tab)}>
      <FontAwesome6
        name={icon}
        size={20}
        color={route.name == tab && 'orange'}
      />
      <Text style={{color: 'black', fontSize: 8}}>{tab}</Text>
    </TouchableOpacity>
  );
};

export default FooterTabs;

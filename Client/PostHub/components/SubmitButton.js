import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const SubmitButton = ({SubmitText, onPress, icon}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#5e503f',
        padding: '2%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: '80%',
        alignSelf: 'center',
        flexDirection: icon ? 'row' : 'column',
      }}
      onPress={onPress}>
      {icon}
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
        }}>
        {SubmitText}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;

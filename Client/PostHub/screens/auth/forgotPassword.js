import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const forgotPassword = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Forgot Password</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1d5c9',
  },

  errorText: {
    color: 'red',
    marginHorizontal: 20,
  },

  forgotPasswordText: {
    color: '#5e503f',
    textAlign: 'right',
    marginTop: 10,
  },
});

export default forgotPassword;

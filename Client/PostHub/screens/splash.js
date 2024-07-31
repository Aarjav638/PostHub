import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Text>Splash Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1d5c9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;

import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import React from 'react';

const Splash = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.IconWrapper}>
        <Image
          source={require('../assets/Icon.png')}
          style={{height: 80, width: 80, objectFit: 'contain'}}
        />
        <Text style={{fontSize: 22, color: 'gray', textTransform: 'uppercase'}}>
          PostHub
        </Text>
      </View>

      <View style={styles.TextWrapper}>
        <Text style={{fontSize: 18, color: 'gray'}}>From</Text>
        <Text style={{fontSize: 25, color: 'gray'}}>Aarjav</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1d5c9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconWrapper: {
    flex: 4,
    gap: 10,
    marginVertical: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextWrapper: {
    flex: 1,
    marginVertical: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default Splash;

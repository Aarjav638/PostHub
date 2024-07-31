/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import Navigator from './components/Navigation/Navigator';
import Splash from './screens/splash';
import { StatusBar } from 'react-native';

function App(){
const [show, setShow] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 2000);
  }, []);


  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'#e1d5c9'}
        barStyle={'dark-content'}
      />
        {show ? <Splash /> : <Navigator />}
    </>
  );
}

export default App;

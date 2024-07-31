import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthProvider from '../../context/auth/authProvider';
import ScreenMenu from '../Menus/ScreenMenu';
import PostProvider from '../../context/Post/postProvider';
const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PostProvider>
          <ScreenMenu />
        </PostProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};
export default Navigator;

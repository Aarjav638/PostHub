import AuthContext from './authContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import React, {useState, useEffect} from 'react';

const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    token: '',
  });

  //loading initial data from local storage and updating the state

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        // console.log('token', token);
        const user = await AsyncStorage.getItem('user');
        // console.log('user', user);
        if (token && user) {
          setState({...state, token: token, user: JSON.parse(user)});
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadUserData();
  }, []);

  //default axios settings
  axios.defaults.headers.common['Authorization'] = `Bearer ${state?.token}`;
  axios.defaults.baseURL =
    'http://ec2-35-154-88-77.ap-south-1.compute.amazonaws.com:4000/api/v1';

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

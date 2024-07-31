import React, {useContext} from 'react';
import Home from '../../screens/Home';
import Login from '../../screens/auth/login';
import Register from '../../screens/auth/register';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthContext from '../../context/auth/authContext';
import {Alert, TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyPost from '../../screens/MyPost';
import Account from '../../screens/Account';
import Post from '../../screens/Post';
const ScreenMenu = () => {
  const stack = createNativeStackNavigator();
  const [state, setState] = useContext(AuthContext);

  const authenticated = state?.user && state?.token;

  const handelLogout = async () => {
    setState({...state, user: null, token: ''});
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    Alert.alert('Logged out Successfully');
  };
  return (
    <stack.Navigator initialRouteName="Login">
      {authenticated ? (
        <>
          <stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'PostHub',
              headerShown: true,
              headerRight: () => (
                <TouchableOpacity onPress={handelLogout}>
                  <FontAwesome6
                    name={'right-from-bracket'}
                    size={20}
                    color={'black'}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <stack.Screen
            name="My Post"
            component={MyPost}
            options={{
              title: 'About',
              headerShown: true,
              headerRight: () => (
                <TouchableOpacity onPress={handelLogout}>
                  <FontAwesome6
                    name={'right-from-bracket'}
                    size={20}
                    color={'black'}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <stack.Screen
            name="Account"
            component={Account}
            options={{
              headerShown: true,
              headerRight: () => (
                <TouchableOpacity onPress={handelLogout}>
                  <FontAwesome6
                    name={'right-from-bracket'}
                    size={20}
                    color={'black'}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <stack.Screen
            name="Post"
            component={Post}
            options={{
              headerShown: true,
              headerRight: () => (
                <TouchableOpacity onPress={handelLogout}>
                  <FontAwesome6
                    name={'right-from-bracket'}
                    size={20}
                    color={'black'}
                    style={{marginRight: 10}}
                  />
                </TouchableOpacity>
              ),
            }}
          />
        </>
      ) : (
        <>
          <stack.Screen name="Login" component={Login} />
          <stack.Screen name="Register" component={Register} />
        </>
      )}
    </stack.Navigator>
  );
};

export default ScreenMenu;

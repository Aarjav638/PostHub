import React, {useState, useContext} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import AuthContext from '../../context/auth/authContext';
import InputFields from '../../components/Forms/inputFields';
import SubmitButton from '../../components/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  //global states
  const [state, setState] = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key, value) => {
    setForm({...form, [key]: value});
    setErrors({...errors, [key]: false});
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      email: !emailRegex.test(form.email),
      password: form.password.length <= 6,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/auth/login', form);

      Alert.alert('Login SuccessFull:', res.data.message);
      setState({...state, user: res.data.user, token: res.data.token});
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data?.message || 'Something went wrong');
      Alert.alert(
        'Login Failed',
        error?.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleLogin();
    } else {
      Alert.alert('Please check your Email, or Password');
    }
  };

  // const getLocalStorage = async () => {
  //   let data = await AsyncStorage.getItem('user');
  //   console.log('local data => ', data);
  // };

  // getLocalStorage();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        {errors.email && (
          <Text style={styles.errorText}>Please check your email*</Text>
        )}
        <InputFields
          text="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoComplete="email"
          value={form.email}
          onChangeText={value => handleChange('email', value.toLowerCase())}
        />

        {errors.password && (
          <Text style={styles.errorText}>
            Password must be greater than 6 characters*
          </Text>
        )}
        <InputFields
          text="Password"
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          keyboardType="default"
          autoComplete="password"
          value={form.password}
          onChangeText={value => handleChange('password', value)}
        />
        <View style={styles.row}>
          <View style={styles.showPasswordContainer}>
            <Text style={styles.showPasswordText}>Show Password</Text>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={
                  showPassword
                    ? require('../../assets/checkbox.png')
                    : require('../../assets/box.png')
                }
                style={styles.checkbox}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <SubmitButton
          SubmitText={loading ? 'Please Wait...' : 'Login'}
          onPress={handleSubmit}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#5e503f', fontSize: 12}}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text
            style={{
              color: '#5e503f',
              fontWeight: 'bold',
              fontSize: 12,
              marginHorizontal: 4,
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1d5c9',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5e503f',
  },
  formContainer: {
    justifyContent: 'center',
    marginVertical: '8%',
  },
  errorText: {
    color: 'red',
    marginHorizontal: 20,
  },
  checkbox: {
    height: 20,
    width: 20,
    tintColor: '#5e503f',
  },
  forgotPasswordText: {
    color: '#5e503f',
    fontSize: 10,
  },
  showPasswordText: {
    color: '#5e503f',
    fontSize: 10,
  },
  showPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '8%',
  },
});

export default Login;

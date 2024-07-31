import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import InputFields from '../../components/Forms/inputFields';
import SubmitButton from '../../components/SubmitButton';
import axios from 'axios';

const Register = ({navigation}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: false,
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
      name: form.name.trim() === '',
      email: !emailRegex.test(form.email),
      password: form.password.length <= 6,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/auth/register', form);
      Alert.alert('User registered:', res.data.message, [
        {text: 'Okay', onPress: () => navigation.navigate('Login')},
      ]);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleRegister();
    } else {
      Alert.alert('Please check your Name, Email, or Password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.formContainer}>
        {errors.name && (
          <Text style={styles.errorText}>Please enter your name*</Text>
        )}
        <InputFields
          text="Name"
          placeholder="Enter your name"
          keyboardType="default"
          autoComplete="name"
          value={form.name}
          onChangeText={value => handleChange('name', value)}
        />

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
        </View>
        <SubmitButton
          SubmitText={loading ? 'Please Wait...' : 'Register'}
          onPress={handleSubmit}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 12}}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              color: '#5e503f',
              fontWeight: 'bold',
              fontSize: 12,
              marginHorizontal: 4,
            }}>
            Login
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
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5e503f',
    marginTop: '25%',
  },
  formContainer: {
    justifyContent: 'center',
    marginVertical: '8%',
  },
  errorText: {
    color: 'red',
    marginHorizontal: 20,
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
  checkbox: {
    height: 20,
    width: 20,
    tintColor: '#5e503f',
  },
});

export default Register;

import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import AuthContext from '../context/auth/authContext';
import InputFields from '../components/Forms/inputFields';
import SubmitButton from '../components/SubmitButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostContext from '../context/Post/postContext';
const Account = ({navigation}) => {
  const [state, setState] = useContext(AuthContext);
  const [posts, setPosts, getAllPosts] = useContext(PostContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: state?.user.name,
    password: '',
    email: state?.user.email,
  });
  const handleChange = (key, value) => {
    setForm({...form, [key]: value});
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let res = await axios.put('/auth/update-user', form);
      const data = JSON.stringify(res.data.updateduser);
      await AsyncStorage.setItem('user', data);
      setState({
        ...state,
        user: JSON.parse(data), // Update context state
      });
      Alert.alert(
        'Update SuccessFull:',
        res.data.message || 'user Updated SuccessFully',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home'), getAllPosts();
            },
          },
        ],
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert(
        'Update Failed',
        error.response.data.message || 'User Update Failed',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 50}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.imageConatiner}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
              }}
              style={{
                width: '100%',
                height: '80%',
                objectFit: 'contain',
              }}
            />

            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'red',
              }}>
              Currently You can Update your name and Password Only!
            </Text>
          </View>
          <View style={styles.form}>
            <View style={styles.formValue}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                defaultValue={state?.user.email}
                editable={false}
                style={styles.inputBox}
              />
            </View>
            <View style={styles.formValue}>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                autoComplete="name"
                value={form.name}
                onChangeText={value => handleChange('name', value)}
                style={styles.inputBox}
              />
            </View>

            <View style={styles.formValue}>
              <Text style={styles.label}>Password:</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  autoComplete="password"
                  value={form.password}
                  secureTextEntry={!showPassword}
                  onChangeText={value => handleChange('password', value)}
                  style={[styles.inputBox, {width: '100%'}]}
                />
                <TouchableOpacity
                  style={{marginLeft: -25}}
                  onPress={() => setShowPassword(!showPassword)}>
                  <Image
                    source={
                      showPassword
                        ? require('../assets/hide.png')
                        : require('../assets/view.png')
                    }
                    style={styles.checkbox}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.formValue}>
              <Text style={styles.label}>Role:</Text>
              <TextInput
                defaultValue={state?.user.role}
                editable={false}
                style={styles.inputBox}
              />
            </View>
            <SubmitButton
              SubmitText={loading ? 'Please Wait...' : 'Update Profile'}
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <FooterMenu />
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1d5c9',
  },
  checkbox: {
    height: 22,
    width: 22,
    tintColor: '#5e503f',
  },
  imageConatiner: {
    padding: '8%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 5,
  },

  form: {
    flex: 2,
    padding: '4%',
    marginBottom: '4%',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5e503f',
  },
  inputBox: {
    marginVertical: '3%',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '60%',
    height: 45,
    fontSize: 12,
  },
  formValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
  },
  footer: {height: '8%', justifyContent: 'flex-end'},
});
{
  /* <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 50}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <SafeAreaView style={styles.container}>
          <View style={styles.imageConatiner}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
              }}
              style={{
                width: '100%',
                height: '80%',
                objectFit: 'contain',
              }}
            />

            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'red',
              }}>
              Currently You can Update your name and Password Only!
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.formValue}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                defaultValue={state?.user.email}
                editable={false}
                style={styles.inputBox}
              />
            </View>
            <View style={styles.formValue}>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                autoComplete="name"
                value={form.name}
                onChangeText={value => handleChange('name', value)}
                style={styles.inputBox}
              />
            </View>

            <View style={styles.formValue}>
              <Text style={styles.label}>Password:</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  autoComplete="password"
                  value={form.password}
                  secureTextEntry={!showPassword}
                  onChangeText={value => handleChange('password', value)}
                  style={[styles.inputBox, {width: '100%'}]}
                />
                <TouchableOpacity
                  style={{marginLeft: -25}}
                  onPress={() => setShowPassword(!showPassword)}>
                  <Image
                    source={
                      showPassword
                        ? require('../assets/hide.png')
                        : require('../assets/view.png')
                    }
                    style={styles.checkbox}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.formValue}>
              <Text style={styles.label}>Role:</Text>
              <TextInput
                defaultValue={state?.user.role}
                editable={false}
                style={styles.inputBox}
              />
            </View>
            <SubmitButton
              SubmitText={loading ? 'Please Wait...' : 'Update Profile'}
              onPress={handleSubmit}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
      <View style={styles.footer}>
        <FooterMenu />
      </View>
    </KeyboardAvoidingView> */
}

import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import InputFields from '../components/Forms/inputFields';
import SubmitButton from '../components/SubmitButton';
import axios from 'axios';
import PostContext from '../context/Post/postContext';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {SafeAreaView} from 'react-native-safe-area-context';
const Post = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useContext(PostContext);
  const handleTitle = text => {
    setTitle(text);
  };

  const handleDescription = text => {
    setDescription(text);
  };

  const handleSubmit = async () => {
    console.log('Title:', title, 'Description:', description);
    setLoading(true);
    try {
      if (!title || !description) {
        Alert.alert('Error', 'Please provide title and description!');
        return;
      }

      const {data} = await axios.post('/post/create-post', {
        title,
        description,
      });

      setPosts([...posts, data.savedPost]);

      Alert.alert('Success', 'Post created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      setLoading(false);

      Alert.alert('Error', error.message || error.response.data.message);
    } finally {
      setLoading(false);
      setDescription('');
      setTitle('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 50}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>Create A Post</Text>
            <View style={styles.form}>
              <Text style={styles.label}>Add a Title:</Text>
              <TextInput
                value={title}
                onChangeText={handleTitle}
                placeholder="Enter Your Title"
                style={styles.inputBox}
              />
              <Text style={styles.label}>Add Description:</Text>
              <TextInput
                value={description}
                onChangeText={handleDescription}
                placeholder="Enter Your Description"
                style={[styles.inputBox, {height: 200}]}
                multiline={true}
                numberOfLines={6}
              />
              <SubmitButton
                icon={
                  loading ? (
                    ''
                  ) : (
                    <FontAwesome6 name="square-plus" size={16} color="white" />
                  )
                }
                SubmitText={loading ? 'Please Wait....' : 'Create Post'}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <FooterMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1d5c9',
  },
  title: {
    transform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    padding: '4%',
    alignItems: 'center',
    height: 450,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginHorizontal: '4%',
    marginVertical: '5%',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5e503f',
    textTransform: 'uppercase',
  },
  inputBox: {
    marginVertical: '4%',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    borderRadius: 10,
    width: '100%',
    height: 50,
  },
  footer: {height: '8%', justifyContent: 'flex-end'},
});

export default Post;

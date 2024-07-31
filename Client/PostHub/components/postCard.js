import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {
  useCallback,
  useMemo,
  useEffect,
  useState,
  useContext,
} from 'react';
import moment from 'moment';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation, useRoute} from '@react-navigation/native';
import PostContext from '../context/Post/postContext';
import SubmitButton from './SubmitButton';
import axios from 'axios';
const PostCard = ({posts: post, onPostChange, onRefresh, refreshing}) => {
  const [posts, setPosts, getAllPosts] = useContext(PostContext);
  const navigation = useNavigation();
  const route = useRoute();
  const isHomeRoute = useMemo(() => route.name === 'Home', [route.name]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [id, setId] = useState('');
  const handleTitle = text => {
    setTitle(text);
  };

  const handleDescription = text => {
    setDescription(text);
  };

  const handleDeletePrompt = id => {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => handleDelete(id),
        style: 'destructive',
      },
    ]);
  };
  const handleDelete = async postId => {
    setLoading(true);
    try {
      await axios.delete(`/post/delete-post/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
      onPostChange();
      getAllPosts();
      Alert.alert('Success', 'Post deleted successfully!', [
        {text: 'ok', onPress: () => navigation.navigate('Home')},
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async postId => {
    setLoading(true);
    try {
      const res = await axios.put(`/post/update-post/${postId}`, {
        title,
        description,
      });
      setPosts(res?.data?.updatedPost);
      onPostChange();
      getAllPosts();
      Alert.alert('Success', 'Post Updated successfully!', [
        {text: 'ok', onPress: () => navigation.navigate('Home')},
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = useCallback(
    ({item}) => {
      return (
        <View style={styles.postCardWrapper}>
          <View style={styles.postCard}>
            <Text style={styles.title}>Title: {item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            {isHomeRoute && (
              <View style={styles.postInfo}>
                <Text>
                  <FontAwesome6 name="user" /> {item?.postedBy?.name}
                </Text>
                <Text>
                  <FontAwesome6 name="calendar" />{' '}
                  {moment(item?.createdAt).format('DD:MM:YYYY')}
                </Text>
              </View>
            )}
            {!isHomeRoute && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginHorizontal: '8%',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {
                    setVisible(true);
                    setId(item._id);
                    setTitle(item.title);
                    setDescription(item.description);
                  }}>
                  <FontAwesome6
                    name="pen-to-square"
                    size={18}
                    color="lightblue"
                  />
                  <Text style={{color: 'lightblue'}}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {
                    handleDeletePrompt(item._id);
                  }}>
                  <FontAwesome6 name="trash" size={18} color="red" />
                  <Text style={{color: 'red'}}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      );
    },
    [isHomeRoute, posts, loading],
  );
  // useEffect(() => {
  //   console.log(id);
  // }, [id]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Total Posts: {post?.length}</Text>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        refreshing={refreshing}
        data={post}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
          }}>
          <View style={styles.form}>
            <FontAwesome6
              name="x"
              size={18}
              color="red"
              onPress={() => {
                setVisible(false);
                setTitle('');
                setDescription('');
              }}
            />

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
              SubmitText={loading ? 'Please Wait....' : 'Update Post'}
              onPress={() => {
                handleUpdate(id);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    padding: 8,
  },
  postCardWrapper: {
    marginVertical: 10,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 4,
        backgroundColor: 'white',
        overflow: 'hidden', // Ensure the shadow respects the border radius
      },
    }),
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    overflow: 'hidden', // Ensure content is clipped to the border radius
    ...Platform.select({
      ios: {
        borderWidth: 0.2,
        borderColor: 'gray',
      },
    }),
  },
  title: {
    fontWeight: 'bold',
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomColor: 'gray',
  },
  description: {
    marginVertical: '4%',
  },
  postInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  form: {
    padding: '4%',
    elevation: 5,
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
    textAlign: 'center',
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
});

export default PostCard;

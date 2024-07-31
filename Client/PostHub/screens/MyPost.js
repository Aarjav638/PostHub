import {
  Alert,
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import PostCard from '../components/postCard';
import axios from 'axios';
const MyPost = () => {
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchPost();
  }, []);

  const onRefresh = useCallback(() => {
    setLoading(true);
    fetchPost();
    setTimeout(() => setLoading(false), 5000);
  }, []);

  //get user post from the server

  const fetchPost = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get('/post/get-posts');
      setUserPost(data?.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{flex: 1, marginBottom: '12%'}}>
          <PostCard
            posts={userPost}
            onPostChange={fetchPost}
            onRefresh={onRefresh}
            refreshing={loading}
          />
        </View>
      )}

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
  footer: {
    flex: 1,
    maxHeight: '8%',
    justifyContent: 'flex-end',
  },
});

export default MyPost;

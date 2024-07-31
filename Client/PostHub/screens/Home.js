import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useContext, useState, useCallback} from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import PostContext from '../context/Post/postContext';
import PostCard from '../components/postCard';

const Home = () => {
  const [posts, setPosts, getAllPosts] = useContext(PostContext);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <PostCard posts={posts} onRefresh={onRefresh} refreshing={refreshing} />

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
    height: '8%',
    justifyContent: 'flex-end',
  },
});

export default Home;

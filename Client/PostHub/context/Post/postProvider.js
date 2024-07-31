import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PostContext from './postContext';

const PostProvider = ({children}) => {
  //state

  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);

  //loading initial data from database and updating the state

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/post/get-all-posts');
      const data = res.data.posts;
      setPosts(data ? data : []);
    } catch (error) {
      console.log('Error:', error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  //   loading ? '' : console.log('Posts:', posts);
  return (
    <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;

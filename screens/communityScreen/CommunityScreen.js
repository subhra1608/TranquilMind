import { View, Text, ActivityIndicator, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import HorizontalLine from '../../Components/HorizontalLine';
import PostCardComponent from '../../Components/PostCardComponent';
import { postData } from '../../data/postData';

const CommunityScreen = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

  }, [])

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 6 }}>
        <View onPress={() => navigation.navigate('PostDetail', { postId: item.id })}>
        <PostCardComponent
          username={item.username}
          postedOn={item.postedOn}
          postImage={item.postImage}
          postTitle={item.postTitle}
          postDescription={item.postDescription}
          postLikes={item.postLikes}
          postComments={item.postComments}
        />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1,marginTop:20 }}>
      {isLoading &&
        (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={40} />
          </View>)
      }
      <View style={{ flexDirection: 'row', marginTop:10, marginRight:6, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}> View Posts</Text>
        </View>
        <View>
          <Button title='add post' color='green' onPress={null} />
        </View>
      </View>
      <HorizontalLine borderWidth={2} />
      <View style={{ padding: 2 }}>
        <FlatList
          data={postData}
          keyExtractor={(item, index) => item.id}
          renderItem={renderItem}
          horizontal={false}
        />
      </View>
      
    </View>
  )
}

export default CommunityScreen

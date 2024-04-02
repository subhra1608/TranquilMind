import { View, Text, ActivityIndicator, Button, FlatList, TouchableOpacity } from 'react-native'
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
        <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: item.postId })}>
          <PostCardComponent item={item} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading &&
        (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={40} />
          </View>)
      }
      <View style={{ flexDirection: 'row', margin: 2, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}> View Posts</Text>
        </View>
        <View>
          <Button title='add post' color='green' onPress={null} />
        </View>
      </View>
      <HorizontalLine />
      <View style={{ padding: 2 }}>
        <FlatList
          data={postData}
          keyExtractor={(item, index) => item.postId.toString()}
          renderItem={renderItem}
          horizontal={false}
        />
      </View>
      
    </View>
  )
}

export default CommunityScreen

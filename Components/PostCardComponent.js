import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { Avatar, Divider } from 'react-native-paper';
import HorizontalLine from './HorizontalLine';
import { Ionicons } from '@expo/vector-icons'

const PostCardComponent = ({ username, postedOn, postImage, postTitle, postDescription, postLikes, postComments }) => {
  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    // Implement your like functionality here
    // This is just a placeholder function
    console.log('Liked!');
  };

  const handleSubmitComment = () => {
    // Implement your comment submission logic here
    // This is just a placeholder function
    console.log('Comment submitted:', commentInput);
    setCommentInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.postedOn}>{postedOn}</Text>
      </View>
      <Image source={{ uri: postImage }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{postTitle}</Text>
      <Text style={styles.description}>{postDescription}</Text>
      <View style={styles.interactions}>
        <TouchableOpacity style={styles.interaction} onPress={handleLike}>
          <Text style={styles.interactionText}>{postLikes}</Text>
          <Image source={{uri:'https://png.pngtree.com/png-vector/20210228/ourmid/pngtree-fluttering-red-flag-png-image_2986748.jpg'}} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.interaction}
          onPress={() => setShowComments(!showComments)}
        >
          <Ionicons size={15} name='chatbox-outline'></Ionicons><Text className=" ml-1" style={styles.interactionText}>{showComments ? 'Hide Comments' : 'View Comments'}</Text>
        </TouchableOpacity>
      </View>
      {showComments && (
        <View style={styles.comments}>
          {postComments.map((comment, index) => (
            <View key={index} style={styles.commentContainer} className="mt-2">
              <View className="flex-row col justify-start">
                <View>
                  <Avatar.Text size={30} label={comment.username[0].toUpperCase()} />
                </View>
                <View  className="mx-2 mt-1">
                  <Text style={styles.commentUsername}>{comment.username}</Text>
                </View>
              </View>
              <HorizontalLine borderWidth={1}/>

              <View style={styles.commentContent} className="my-1">
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            </View>
          ))}
          <View className="flex flex-row justify-between mt-2">
            <View >
              <TextInput
               className="border-black rounded-lg border-2 w-72  "
              style={styles.commentInput}
              placeholder="Add a comment..."
              multiline
              value={commentInput}
              onChangeText={setCommentInput}
              />
            </View>
            <View>
              <Button title="Submit" onPress={handleSubmitComment} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default PostCardComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  postedOn: {
    fontSize: 12,
    color: 'gray',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  interactions: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  interaction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  interactionText: {
    fontSize: 14,
    marginRight: 4,
  },
  icon: {
    width: 20,
    height: 20,
  },
  comments: {
    marginTop: 8,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginRight: 4,
  },
});


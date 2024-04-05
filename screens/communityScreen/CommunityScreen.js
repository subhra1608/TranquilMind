import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated, Dimensions } from 'react-native';
import PostCardComponent from '../../Components/PostCardComponent';
import { postData } from '../../data/postData';

const { width } = Dimensions.get('window');
const segmentWidth = width / 2; // Assuming two segments

const CommunityScreen = ({ navigation }) => {
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [isViewPostsSelected,setIsViewPostsSelected]=useState(true);
  const indicatorAnim = useRef(new Animated.Value(0)).current;

  const handleSelectSegment = (index) => {
    Animated.timing(indicatorAnim, {
      toValue: index * segmentWidth,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setSelectedSegmentIndex(index);

    if(index===0)
    setIsViewPostsSelected(true);
  else if(index===1)
  setIsViewPostsSelected(false);
  };

  

  const renderItem = ({ item }) => <PostCardComponent {...item} />

  return (
    <View style={styles.container}>
      <View style={styles.segmentContainer}>
        <Animated.View
          style={[
            styles.indicator,
            { 
              width: segmentWidth - 10, // Slightly less width than the segment
              transform: [{ translateX: indicatorAnim }],
              zIndex: 1,
            },
          ]}
        />
        {['View Posts', 'View Questions'].map((segment, index) => (
          <TouchableOpacity
            key={segment}
            onPress={() => handleSelectSegment(index)}
            style={styles.segment}
          >
            <Text style={[styles.segmentText, selectedSegmentIndex === index && styles.segmentTextActive]}>
              {segment}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <>
      {isViewPostsSelected && (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePostScreen')} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Post</Text>
        </TouchableOpacity>
        <FlatList
          data={postData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
      )}
      {!isViewPostsSelected && (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePostScreen')} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Question</Text>
        </TouchableOpacity>
        <FlatList
          data={[]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
      )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDD', // Light gray background
    borderRadius: 25,
    margin: 10,
    padding: 2,
  },
  segment: {
    width: segmentWidth,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Ensure the segment text is above the indicator
  },
  segmentText: {
    color: '#7F3DB5', // Purple text color
    fontSize: 16,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: '#FFFFFF', // White text for the active segment
  },
  indicator: {
    height: '100%',
    borderRadius: 25,
    backgroundColor: '#9B8BCA', // Purple indicator
    position: 'absolute',
    top: 0,
    left: 0,
  },
  addButton: {
    backgroundColor: '#9B8BCA',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  postContainer: {
    marginBottom: 30,
  },
});

export default CommunityScreen;











import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const data = [
    { 
      image: 'https://media.post.rvohealth.io/wp-content/uploads/2022/11/Self_Care_Quiz_Article_Assets-copyperfect_gift_quiz_thumb_732x549.png-732x549.png' 
    },{ 
      image: 'https://img.freepik.com/free-photo/zen-stones-balanced-beach-with-copy-space-sunrise-light-meditation-relaxation-ai-generative_123827-23551.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711497600&semt=ais' 
    },{ 
      image: 'data:image/jpeg;base64,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' 
    },{ 
      image: 'https://media.post.rvohealth.io/wp-content/uploads/2022/11/Self_Care_Quiz_Article_Assets-copyperfect_gift_quiz_thumb_732x549.png-732x549.png' 
    },
    
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (activeSlide + 1) % data.length;
      scrollToSlide(nextSlide);
    }, 3000); // Adjust the interval duration as needed (in milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, [activeSlide]);

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveSlide(slideIndex);
  };

  const scrollToSlide = (index) => {
    setActiveSlide(index);
    scrollViewRef.current.scrollTo({ x: screenWidth * index, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={200}
        style={styles.scrollView}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, index === activeSlide && styles.activeDot]}
            onPress={() => scrollToSlide(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 200, // Set your desired height
    resizeMode: 'cover',
    marginBottom: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#888',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
});

export default Carousel;




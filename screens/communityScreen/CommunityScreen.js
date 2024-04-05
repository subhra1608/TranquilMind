import { View, Text , TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'

const CommunityScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>CommunityScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CreatePostScreen')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Create Post</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#7f3db5',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default CommunityScreen
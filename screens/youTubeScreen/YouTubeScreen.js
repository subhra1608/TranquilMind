import { View,ActivityIndicator, StyleSheet,Text,Image,Linking } from 'react-native'
import React, { useState,useEffect } from 'react'
import { WebView } from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const YouTubeScreen = ({route}) => {
  const [youTubeURL,setYouTubeURL] = useState("");

    useEffect(() => {
      setYouTubeURL(route.params.item.item.articleUrl);
    }, [])

    const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <SafeAreaProvider>
      <View className ="mt-8" style={styles.container}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      )}
      {
        !isLoading && (
        <WebView
            source={{ uri: youTubeURL}}
            onLoad={handleLoad}
          />
        )
      }
    </View>
    </SafeAreaProvider>
  );
}

export default YouTubeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});
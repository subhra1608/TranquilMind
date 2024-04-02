import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const PostCardComponent = ({item}) => {
  return (
  <Card  elevation={3}>
    <Card.Title title="Card Title"/>
    {item.image.length>0 && <Card.Cover source={{ uri:'https://picsum.photos/700'}} />}
    <Card.Content>
      <Text variant="bodyMedium">Card content</Text>
      <Text>{item.description}</Text>
    </Card.Content>
    
    <Card.Actions>
      <Button icon='flag' textColor='red'>{item.flags}</Button>
    </Card.Actions>
  </Card>
)};

export default PostCardComponent;

const styles = StyleSheet.create({
  
  top: {
    height:'50%'
  },
  middle: {
    flex: 0.3,
    backgroundColor: 'beige',
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: 'pink',
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

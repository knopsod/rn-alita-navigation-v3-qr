import React from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Thumbnail,
  Body
} from "native-base";

export default class ThumbnailPictureScreen extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = props;

    this.state = {
      uri: navigation.getParam('uri', ''),
    };
  }
  
  render() {
    const halfWidth = Dimensions.get('screen').width/2;
    const scWidth = Dimensions.get('screen').width - 10;
    const { uri } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Form style={{ marginTop: 15, marginLeft: 5, marginRight: 5 }}>
            <Thumbnail square large source={{ uri: uri }}
              style={{ width: scWidth, height: scWidth }}/>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange"
  }
});
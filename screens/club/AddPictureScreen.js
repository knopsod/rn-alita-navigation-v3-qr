import React from 'react'
import { Text, StyleSheet, Alert } from 'react-native'
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
  Icon
} from "native-base";
import firebase from '../../Firebase';
import { ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';

export default class AddPictureScreen extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = props;
    this.state = {
      activityKey: navigation.getParam('_key', ''),
    };
  }

  // https://www.youtube.com/watch?v=KkZckepfm2Q
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      console.log('!cancelled');
      this.uploadImage(result.uri)
        .then(() => {
          Alert.alert('อัพโหลด', 'สำเร็จ')
        })
        .catch((error) => {
          Alert.alert('อัพโหลด', 'ล้มเหลว')
        });
    }
  }

  uploadImage = async (uri) => {
    const { activityKey } = this.state;
    
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    var ref = firebase.storage().ref(activityKey).child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }
  
  render() {

    return (
      <Container style={styles.container}>
        <Content>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={this.onChooseImagePress}>
            <Text style={{ color: '#fff' }}>อัพโหลด</Text>
          </Button>
          
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
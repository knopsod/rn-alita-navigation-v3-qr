import React from 'react'
import { Text, StyleSheet, Dimensions, Alert } from 'react-native'
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
import firebase from '../../Firebase';
import { ImagePicker, Permissions, MapView } from 'expo';
import uuid from 'uuid';
import moment from 'moment';

export default class SelfyScreen extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = props;

    this.state = {
      _key: navigation.getParam('_key', ''), 
      activityKey: navigation.getParam('activityKey', ''), 
      activityName: navigation.getParam('activityName', ''), 
      dateTime: navigation.getParam('dateTime', ''), 
      uri: navigation.getParam('uri', ''),
      userId: navigation.getParam('userId', ''), 
      uuID: '',
      DateTimeOriginal: navigation.getParam('DateTimeOriginal', ''),
      GPSLatitude: navigation.getParam('GPSLatitude', ''),
      GPSLongitude: navigation.getParam('GPSLongitude', ''),
    };

    console.log(`_key: ${this.state._key}, uri: ${this.state.uri}`);
  }

  // https://www.youtube.com/watch?v=KkZckepfm2Q
  // https://github.com/expo/firebase-storage-upload-example/blob/master/App.js
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ exif: true });

    if (!result.cancelled) {
      console.log('!result.cancelled');
      console.log('result: ', result);
      const { DateTimeOriginal, GPSLatitude, GPSLongitude } = result.exif;
      console.log(DateTimeOriginal, GPSLatitude, GPSLongitude);
      this.uploadImage(result.uri)
        .then((response) => {
          console.log(response);
          this.onUploaded(response, DateTimeOriginal, GPSLatitude, GPSLongitude);
          Alert.alert('อัพโหลด', 'สำเร็จ')
        })
        .catch((error) => {
          Alert.alert('อัพโหลด', 'ล้มเหลว')
        });
    }
  }
  uploadImage = async (uri) => {
    const { _key } = this.state;
    
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

    const uuID = uuid.v4();

    var ref = firebase.storage().ref('CheckIns/' + _key).child(uuID);
    const snapshot = await ref.put(blob);

    this.setState({
      _key,
      uuID,
    });

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }
  onUploaded = (uri, DateTimeOriginal, GPSLatitude, GPSLongitude) => {
    console.log(DateTimeOriginal, GPSLatitude, GPSLongitude);
    const { _key, activityKey, activityName, dateTime, userId } = this.state;
    // const dateTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    // https://www.youtube.com/watch?v=BWIN4JBm0-k&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=6
    // https://github.com/nathvarun/React-Native-Firebase-Tutorials/blob/master/Project%20Files/4%265%20Swipeable%20Lists/Complete/App.js
    var set = firebase.database().ref('CheckIns').child(_key).set({ 
      _key, 
      activityKey, 
      activityName, 
      dateTime, 
      userId,
      uri,
      DateTimeOriginal,
      GPSLatitude,
      GPSLongitude
    });
    set.then(() => {
      this.setState({ uri, DateTimeOriginal, GPSLatitude, GPSLongitude });
    });
  }
  
  render() {
    const halfWidth = Dimensions.get('screen').width/2;
    const scWidth = Dimensions.get('screen').width - 10;
    const { uri, DateTimeOriginal, GPSLatitude, GPSLongitude } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={this.onChooseImagePress}>
            <Text style={{ color: '#fff' }}>อัพโหลด</Text>
          </Button>
          <Form style={{ marginTop: 15, marginLeft: 5, marginRight: 5 }}>
            <Thumbnail square large source={{ uri: uri }}
              style={{ width: scWidth, height: scWidth }}/>
          </Form>
          <Form style={{ marginTop: 15, marginLeft: 5, marginRight: 5 }}>
            <Text>{`เมื่อ : ${DateTimeOriginal}`}</Text>
            <Text>{`ลติจูด: ${GPSLatitude}`}</Text>
            <Text>{`ลองจิจูด: ${GPSLongitude}`}</Text>
          </Form>
          <Form style={{ marginTop: 15, marginLeft: 5, marginRight: 5 }}>
            <MapView style={{ width: scWidth, height: scWidth }}
              initialRegion={{
                latitude: parseFloat(GPSLatitude),
                longitude: parseFloat(GPSLongitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: parseFloat(GPSLatitude),
                  longitude: parseFloat(GPSLongitude),
                }}
                />
            </MapView>
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
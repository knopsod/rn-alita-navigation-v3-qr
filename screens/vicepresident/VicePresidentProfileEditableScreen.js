import React, { Component } from 'react'
import { Text, StyleSheet, AsyncStorage, Dimensions, Alert } from 'react-native'
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form,
  Thumbnail
} from "native-base";

import firebase from '../../Firebase';
import { ImagePicker, Permissions, MapView } from 'expo';
import uuid from 'uuid';
import moment from 'moment';

export default class VicePresidentProfileEditableScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      _key: navigation.getParam('_key', ''),
      userId: navigation.getParam('userId', ''),
      firstName: navigation.getParam('firstName', ''),
      lastName: navigation.getParam('lastName', ''),
      status: 'v',
      phoneNo: navigation.getParam('phoneNo', ''),
      position: navigation.getParam('position', ''),
      uri: navigation.getParam('uri', ''),
    };
  }
  componentDidMount() {
    // https://www.google.com/search?q=asyncstorage+setitem+object&oq=AsyncStorage+obj&aqs=chrome.3.69i57j69i60j0l4.12326j0j7&sourceid=chrome&ie=UTF-8
    // https://stackoverflow.com/questions/35596187/react-native-asyncstorage-storing-values-other-than-strings
    // https://medium.com/@richardzhanguw/storing-and-retrieving-objects-using-asyncstorage-in-react-native-6bb1745fdcdd
    console.log('cmd: VicePresidentProfileEditableScreen');
    AsyncStorage.getItem('User')
      .then(data => {
        const user = JSON.parse(data);
        this.setState({
          ...user
        });
      });
  }
  onPress = () => {
    const { 
      userId, 
      firstName, 
      lastName,
      status,
      phoneNo,
      position,
    } = this.state;

    if ( userId === '' ||
      firstName === '' ||
      lastName === '' ||
      status === '' ||
      phoneNo === '' ||
      position === '' ) 
    {
      alert('กรุณาใส่ข้อมูลให้ครบ');
      return;  
    }

    // https://www.youtube.com/watch?v=BWIN4JBm0-k&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=6
    // https://github.com/nathvarun/React-Native-Firebase-Tutorials/blob/master/Project%20Files/4%265%20Swipeable%20Lists/Complete/App.js
    var key = this.state._key ? this.state._key : firebase.database().ref('Users').push().key;
    var set = firebase.database().ref('Users').child(key).set({ ...this.state, _key: key, status: 'v' });
    // set.then((data) => {
    //   this.setState({
    //     userId: '',
    //     firstName: '',
    //     lastName: '',
    //     status: '',
    //     phoneNo: '',
    //     position: '',
    //   });

    //   this.props.navigation.goBack();
    // });
    
    AsyncStorage.setItem('User', JSON.stringify(this.state));
    this.props.navigation.goBack();
  }
  
  // https://www.youtube.com/watch?v=KkZckepfm2Q
  // https://github.com/expo/firebase-storage-upload-example/blob/master/App.js
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ exif: true });

    if (!result.cancelled) {
      console.log('!result.cancelled');
      console.log('result: ', result);
      this.uploadImage(result.uri)
        .then((response) => {
          console.log(response);
          this.onUploaded(response);
          Alert.alert('อัพโหลด', 'สำเร็จ')
        })
        .catch((error) => {
          console.log('error: ', error);
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

    var ref = firebase.storage().ref('Users/' + _key).child(uuID);
    const snapshot = await ref.put(blob);

    this.setState({
      _key,
      uuID,
    });

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }
  onUploaded = (uri) => {
    const { 
      _key,
      userId, 
      firstName, 
      lastName,
      status,
      phoneNo,
      position,
    } = this.state;
    // const dateTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    // https://www.youtube.com/watch?v=BWIN4JBm0-k&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=6
    // https://github.com/nathvarun/React-Native-Firebase-Tutorials/blob/master/Project%20Files/4%265%20Swipeable%20Lists/Complete/App.js
    var set = firebase.database().ref('Users').child(_key).set({ 
      _key, 
      userId, 
      firstName, 
      lastName,
      status,
      phoneNo,
      position,
      uri,
    });
    set.then(() => {
      this.setState({ uri });
    });

    AsyncStorage.setItem('User', JSON.stringify({ ...this.state, uri }));
  }

  render() {
    const { 
      _key,
      userId,
      firstName,
      lastName,
      phoneNo,
      position,
      uri
    } = this.state;

    const halfWidth = Dimensions.get('screen').width/2 - 70;

    return (
      <Container style={styles.container}>
        <Content>
          <Form style={{ marginTop: 20 }}>
            <Form style={{ marginLeft: halfWidth }}>
              { uri === '' ? 
                <Thumbnail large source={require('../../assets/logo.jpg')}
                  style={{ borderRadius: 70, width: 140, height: 140 }}/>
                :
                <Thumbnail large source={{ uri: uri }}
                  style={{ borderRadius: 70, width: 140, height: 140 }}/>
              }
            </Form>
            <Button block style={{ margin: 5 }}
              onPress={this.onChooseImagePress}>
              <Text style={{ color: '#fff' }}>อัพโหลด</Text>
            </Button>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="รหัสรองคณบดี" name="userId"
                keyboardType="numeric"
                value={userId}
                onChangeText={val => this.setState({ userId: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="ชื่อ" name="firstName"
                value={firstName}
                onChangeText={val => this.setState({ firstName: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="นามสกุล" name="lastname"
                value={lastName}
                onChangeText={val => this.setState({ lastName: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="เบอร์โทรศัพท์" name="phoneNo"
                value={phoneNo}
                keyboardType="phone-pad"
                onChangeText={val => this.setState({ phoneNo: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="ตำแหน่ง" name="position"
                value={position}
                onChangeText={val => this.setState({ position: val })} />
            </Item>
          </Form>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={() => this.onPress()}>
            <Text style={{ color: '#fff' }}>{ _key ? 'บันทึก' : 'สร้างใหม่'}</Text>
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

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
  Icon,
  Thumbnail,
  Body
} from "native-base";
import firebase from '../../Firebase';
import { ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import moment from 'moment';

export default class AddPictureScreen extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = props;

    this.state = {
      activityKey: navigation.getParam('_key', ''),
      uuID: '',
      pictures: [],
    };

    this.child = firebase.database().ref().child('Pictures').orderByChild('activityKey').equalTo(this.state.activityKey);
    this.ref = firebase.database().ref().child('Pictures');
  }
  componentDidMount() {
    // https://www.youtube.com/watch?v=Di607bTqhPc&t=2186s
    // https://github.com/rayn-studios-learning/message-board-app/blob/master/App.js
    this.child.on('child_added', snapshot => {
      const data = snapshot.val();
      if (data) {
        this.setState(prevState => ({
          pictures: [data, ...prevState.pictures]
        }))
      }
    });

    this.child.on('child_removed', snapshot => {
      const { _key } = snapshot.val();

      this.setState({
        pictures: this.state.pictures.filter(element => element._key !== _key)
      });
    })
  }
  // https://www.youtube.com/watch?v=KkZckepfm2Q
  // https://github.com/expo/firebase-storage-upload-example/blob/master/App.js
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

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

    const uuID = uuid.v4();

    var ref = firebase.storage().ref('Activities/' + activityKey).child(uuID);
    const snapshot = await ref.put(blob);

    this.setState({
      activityKey,
      uuID,
    });

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }
  onUploaded = (uri) => {
    const { activityKey, uuID } = this.state;
    const dateTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    // https://www.youtube.com/watch?v=BWIN4JBm0-k&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=6
    // https://github.com/nathvarun/React-Native-Firebase-Tutorials/blob/master/Project%20Files/4%265%20Swipeable%20Lists/Complete/App.js
    var key = this.state._key ? this.state._key : firebase.database().ref('Pictures').push().key;
    var set = firebase.database().ref('Pictures').child(key).set({ activityKey, uuID, uri, dateTime, _key: key });
    set.then((data) => {
        // this.props.navigation.goBack();
    });
  }
  confirmRemove(data) {
    const { _key, activityKey, uuID } = data;
    Alert.alert(
      'ลบ',
      'รูปกิจกรรม',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel'
        },
        {
          text: 'ลบ',
          onPress: () => {
            this.ref.child(_key).remove();
            var ref = firebase.storage().ref(activityKey).child(uuID).delete();
          }
        }
      ],
      { cancelable: false }
    )
  }
  render() {
    const { pictures } = this.state;
    console.log(pictures);
    return (
      <Container style={styles.container}>
        <Content>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={this.onChooseImagePress}>
            <Text style={{ color: '#fff' }}>อัพโหลด</Text>
          </Button>
          <List
            dataArray={pictures}
            renderRow={data => {
              return <ListItem
                thumbnail
              >
                <Left
                  >
                  <Button transparent
                    onPress={() => this.props.navigation.navigate('ThumbnailPictureScreen', data)} >
                    <Thumbnail square source={{ uri: data.uri }} />
                  </Button>
                </Left>
                <Body>
                  <Text>เมื่อ</Text>
                  <Text note numberOfLines={1}>{ data.dateTime }</Text>
                </Body>
                <Right>
                  <Button transparent
                    onPress={() => this.confirmRemove(data)} >
                    <Text>ลบ</Text>
                  </Button>
                </Right>
              </ListItem>}
            }
          />
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
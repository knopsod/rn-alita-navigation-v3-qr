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

import firebase from '../../Firebase'

export default class AddPictureScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      _key: '',
      activityKey: navigation.getParam('_key', ''),
      blob: '',
      pictures: [],
    };

    this.child = firebase.database().ref().child('Pictures').orderByChild('activityKey').equalTo(navigation.getParam('_key'));
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
  onPress = () => {
    const { 
      activityKey,
      blob
    } = this.state;

    // https://www.youtube.com/watch?v=BWIN4JBm0-k&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=6
    // https://github.com/nathvarun/React-Native-Firebase-Tutorials/blob/master/Project%20Files/4%265%20Swipeable%20Lists/Complete/App.js
    var key = this.state._key ? this.state._key : firebase.database().ref('Pictures').push().key;
    var set = firebase.database().ref('Pictures').child(key).set({ activityKey, blob, _key: key });
    set.then((data) => {
        this.setState({
          blob: ''
        });

        // this.props.navigation.goBack();
    });
  }
  confirmRemove(data) {
    const { _key, blob } = data;
    Alert.alert(
      'ลบ',
      `${blob}`,
      [
        {
          text: 'ยกเลิก',
          style: 'cancel'
        },
        {
          text: 'ลบ',
          onPress: () => {
            this.ref.child(_key).remove();
          }
        }
      ],
      { cancelable: false }
    )
  }
  render() {
    const { pictures } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={() => this.onPress()}>
            <Text style={{ color: '#fff' }}>อัพโหลด</Text>
          </Button>
          <List
            dataArray={pictures}
            renderRow={data => {
              return <ListItem
                button
                onPress={() => this.confirmRemove(data)}
              >
                <Left>
                  <Text>
                    {data.blob}
                  </Text>
                </Left>
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
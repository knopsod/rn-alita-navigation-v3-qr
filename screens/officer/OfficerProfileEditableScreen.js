import React, { Component } from 'react'
import { Text, StyleSheet, AsyncStorage } from 'react-native'
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form
} from "native-base";

import firebase from '../../Firebase'

export default class OfficerProfileEditableScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      _key: navigation.getParam('_key', ''),
      userId: navigation.getParam('userId', ''),
      firstName: navigation.getParam('firstName', ''),
      lastName: navigation.getParam('lastName', ''),
      status: 'o',
      phoneNo: navigation.getParam('phoneNo', ''),
      position: navigation.getParam('position', ''),
    };
  }
  componentDidMount() {
    // https://www.google.com/search?q=asyncstorage+setitem+object&oq=AsyncStorage+obj&aqs=chrome.3.69i57j69i60j0l4.12326j0j7&sourceid=chrome&ie=UTF-8
    // https://stackoverflow.com/questions/35596187/react-native-asyncstorage-storing-values-other-than-strings
    // https://medium.com/@richardzhanguw/storing-and-retrieving-objects-using-asyncstorage-in-react-native-6bb1745fdcdd
    console.log('cmd: OfficerProfileEditableScreen');
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
      position === '') 
    {
      alert('กรุณาใส่ข้อมูลให้ครบ');
      return;  
    }

    // https://www.youtube.com/watch?v=BWIN4JBm0-k&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=6
    // https://github.com/nathvarun/React-Native-Firebase-Tutorials/blob/master/Project%20Files/4%265%20Swipeable%20Lists/Complete/App.js
    var key = this.state._key ? this.state._key : firebase.database().ref('Users').push().key;
    var set = firebase.database().ref('Users').child(key).set({ ...this.state, _key: key, status: 'o' });
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
  }
  render() {
    const { _key,
      userId,
      firstName,
      lastName,
      phoneNo,
      position } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Form style={{ marginTop: 20 }}>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="รหัสเจ้าหน้าที่" name="userId"
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
                keyboardType="phone-pad"
                value={phoneNo}
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

import React from 'react'
import { Text, StyleSheet } from 'react-native'
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form
} from "native-base";

import firebase from '../../Firebase'

export default class AddOfficerScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      _key: navigation.getParam('_key', ''),
      studentId: navigation.getParam('studentId', ''),
      firstName: navigation.getParam('firstName', ''),
      lastName: navigation.getParam('lastName', ''),
      status: 'o',
      phoneNo: navigation.getParam('phoneNo', ''),
      position: navigation.getParam('position', ''),
    };
  }
  onPress = () => {
    const { 
      studentId, 
      firstName, 
      lastName,
      status,
      phoneNo,
      position,
    } = this.state;

    if ( studentId === '' ||
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
    set.then((data) => {
        this.setState({
          studentId: '',
          firstName: '',
          lastName: '',
          status: '',
          phoneNo: '',
          position: '',
        });

        this.props.navigation.goBack();
    });
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form style={{ marginTop: 20 }}>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="รหัสเจ้าหน้าที่" name="studentId"
                value={this.state.studentId}
                onChangeText={val => this.setState({ studentId: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="ชื่อ" name="firstName"
                value={this.state.firstName}
                onChangeText={val => this.setState({ firstName: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="นามสกุล" name="lastname"
                value={this.state.lastName}
                onChangeText={val => this.setState({ lastName: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="เบอร์โทรศัพท์" name="phoneNo"
                value={this.state.phoneNo}
                onChangeText={val => this.setState({ phoneNo: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="ตำแหน่ง" name="position"
                value={this.state.phoneNo}
                onChangeText={val => this.setState({ position: val })} />
            </Item>
          </Form>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={() => this.onPress()}>
            <Text style={{ color: '#fff' }}>{ this.state._key ? 'บันทึก o' : 'สร้างใหม่ o'}</Text>
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
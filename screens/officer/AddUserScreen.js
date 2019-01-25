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

export default class AddUserScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      _key: navigation.getParam('_key', ''),
      username: navigation.getParam('username', ''),
      password:  navigation.getParam('password', ''),
      confirmPassword:  navigation.getParam('confirmPassword', ''),
      studentId:  navigation.getParam('studentId', ''),
      firstName:  navigation.getParam('firstName', ''),
      lastName:  navigation.getParam('lastName', '')
    };
  }
  onPress = () => {
    const { 
      username, 
      password, 
      confirmPassword, 
      studentId, 
      firstName, 
      lastName 
    } = this.state;

    if ( username === '' ||
      password === '' ||
      confirmPassword === '' ||
      studentId === '' ||
      firstName === '' ||
      lastName === '' ) 
    {
      alert('กรุณาใส่ข้อมูลให้ครบ');
      return;  
    }

    if ( username != '' &&
      password != '' &&
      confirmPassword != '' &&
      studentId != '' &&
      firstName != '' &&
      lastName != '' &&
      password != confirmPassword ) 
    {
      alert('ยืนยันรหัสผ่านไม่ถูกต้อง');
      return;  
    }

    // https://medium.com/mindorks/firebase-realtime-database-with-react-native-5f357c6ee13b
    // firebase.database().ref('Users').push(this.state)
    //   .then((data) => {
    //     this.setState({
    //       username: '',
    //       password: '',
    //       confirmPassword: '',
    //       studentId: '',
    //       firstName: '',
    //       lastName: ''
    //     });

    //     this.props.navigation.goBack();
    //   });

    // https://www.youtube.com/watch?v=BWIN4JBm0-k&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=6
    // https://github.com/nathvarun/React-Native-Firebase-Tutorials/blob/master/Project%20Files/4%265%20Swipeable%20Lists/Complete/App.js
    var key = this.state._key ? this.state._key : firebase.database().ref('Users').push().key;
    var set = firebase.database().ref('Users').child(key).set({ ...this.state, _key: key });
    set.then((data) => {
        this.setState({
          username: '',
          password: '',
          confirmPassword: '',
          studentId: '',
          firstName: '',
          lastName: ''
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
              <Input placeholder="Username" name="username"
                value={this.state.username}
                onChangeText={val => this.setState({ username: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="Password" secureTextEntry name="password"
                value={this.state.password}
                onChangeText={val => this.setState({ password: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="Confirm Password" secureTextEntry name="confirmPassword"
                value={this.state.confirmPassword}
                onChangeText={val => this.setState({ confirmPassword: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="Student ID" name="studentId"
                value={this.state.studentId}
                onChangeText={val => this.setState({ studentId: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="First Name" name="firstName"
                value={this.state.firstName}
                onChangeText={val => this.setState({ firstName: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="Last Name" name="lastname"
                value={this.state.lastName}
                onChangeText={val => this.setState({ lastName: val })} />
            </Item>
          </Form>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={() => this.onPress()}>
            <Text style={{ color: '#fff' }}>{ this.state._key ? 'บันทึก' : 'สร้างใหม่'}</Text>
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
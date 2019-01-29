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
      studentId: navigation.getParam('studentId', ''),
      idCardNo: navigation.getParam('idCardNo', ''),
      prefix: navigation.getParam('prefix', ''),
      firstName: navigation.getParam('firstName', ''),
      lastName: navigation.getParam('lastName', ''),
      faculty: navigation.getParam('faculty', ''),
      status: navigation.getParam('status', ''),
      phoneNo: navigation.getParam('phoneNo', ''),
    };
  }
  onPress = () => {
    const { 
      studentId, 
      idCardNo,
      prefix,
      firstName, 
      lastName,
      faculty,
      status,
      phoneNo,
    } = this.state;

    if ( studentId === '' ||
      idCardNo === '' ||
      prefix === '' ||
      firstName === '' ||
      lastName === '' ||
      faculty === '' ||
      status === '' ||
      phoneNo === '' ) 
    {
      alert('กรุณาใส่ข้อมูลให้ครบ');
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
          studentId: '',
          idCardNo: '',
          prefix: '',
          firstName: '',
          lastName: '',
          faculty: '',
          status: '',
          phoneNo: '',
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
              <Input placeholder="รหัสนักศึกษา" name="studentId"
                keyboardType="numeric"
                value={this.state.studentId}
                onChangeText={val => this.setState({ studentId: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="เลขบัตรประชาชน" name="idCardNo"
                keyboardType="numeric"
                value={this.state.idCardNo}
                onChangeText={val => this.setState({ idCardNo: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="คำนำหน้าชื่อ" name="prefix"
                value={this.state.prefix}
                onChangeText={val => this.setState({ prefix: val })} />
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
              <Input placeholder="สาขาวิชา" name="faculty"
                value={this.state.faculty}
                onChangeText={val => this.setState({ faculty: val })} />
            </Item><Item style={{ marginRight: 15 }}>
              <Input placeholder="สถานะ" name="status"
                value={this.state.status}
                onChangeText={val => this.setState({ status: val })} />
            </Item><Item style={{ marginRight: 15 }}>
              <Input placeholder="เบอร์โทรศัพท์" name="phoneNo"
                keyboardType="phone-pad"
                value={this.state.phoneNo}
                onChangeText={val => this.setState({ phoneNo: val })} />
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
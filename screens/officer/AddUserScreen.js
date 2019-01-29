import React from 'react'
import { Text, StyleSheet } from 'react-native'
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form,
  Radio,
  Picker,
  Title,
  Header
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
  onPressMr = () => {
    this.setState({
      prefix: 'mr',
    })
  }
  onPressMs = () => {
    this.setState({
      prefix: 'ms',
    })
  }
  onPressMrs = () => {
    this.setState({
      prefix: 'mrs',
    })
  }
  onValueChange(value) {
    this.setState({
        faculty : value
    })
  }
  onStatusChange(value) {
    this.setState({
        status : value
    })
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
    const { _key, 
      studentId, 
      idCardNo, 
      prefix, 
      firstName, 
      lastName, 
      faculty, 
      status, 
      phoneNo } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Form style={{ marginTop: 20 }}>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="รหัสนักศึกษา" name="studentId"
                keyboardType="numeric"
                value={studentId}
                onChangeText={val => this.setState({ studentId: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="เลขบัตรประชาชน" name="idCardNo"
                keyboardType="numeric"
                value={idCardNo}
                onChangeText={val => this.setState({ idCardNo: val })} />
            </Item>
            <Item style={{ marginRight: 15, flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
              <Radio selected={prefix === 'mr'}
                onPress={() => this.onPressMr()} />
              <Text> นาย     </Text>
              <Radio selected={prefix === 'mrs'}
                onPress={() => this.onPressMrs()} />
              <Text> นาง     </Text>
              <Radio selected={prefix === 'ms'}
                onPress={() => this.onPressMs()} />
              <Text> นางสาว</Text>
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
              <Picker
                headerComponent={
                  <Header>
                    <Button transparent>
                      Custom Back
                    </Button>
                    <Title>Custom Header</Title>
                  </Header>
                }
                mode='dropdown'
                selectedValue={faculty}
                onValueChange={this.onValueChange.bind(this)}>
                <Item label='ICT' value='ICT' />
                <Item label='SC' value='SC' />
              </Picker>
            </Item>
            <Item style={{ marginRight: 15 }}>
            <Picker
                headerComponent={
                  <Header>
                    <Button transparent>
                      Custom Back
                    </Button>
                    <Title>Custom Header</Title>
                  </Header>
                }
                mode='dropdown'
                selectedValue={status}
                onValueChange={this.onStatusChange.bind(this)}>
                <Item label='นักศึกษาทั่วไป' value='s' />
                <Item label='สโมสร' value='c' />
              </Picker>
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="เบอร์โทรศัพท์" name="phoneNo"
                keyboardType="phone-pad"
                value={phoneNo}
                onChangeText={val => this.setState({ phoneNo: val })} />
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
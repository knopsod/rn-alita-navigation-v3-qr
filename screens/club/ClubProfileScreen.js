import React, { Component } from 'react'
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

export default class ClubProfileScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      _key: navigation.getParam('_key', ''),
      userId: navigation.getParam('userId', ''),
      idCardNo: navigation.getParam('idCardNo', ''),
      prefix: navigation.getParam('prefix', 'mr'),
      firstName: navigation.getParam('firstName', ''),
      lastName: navigation.getParam('lastName', ''),
      faculty: navigation.getParam('faculty', 'เทคโนโลยีสารสนเทศ'),
      status: navigation.getParam('status', 's'),
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
      userId, 
      idCardNo,
      prefix,
      firstName, 
      lastName,
      faculty,
      status,
      phoneNo,
    } = this.state;

    if ( userId === '' ||
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
          userId: '',
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
      userId, 
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
              <Input placeholder="รหัสนักศึกษา" name="userId"
                keyboardType="numeric"
                value={userId}
                onChangeText={val => this.setState({ userId: val })} />
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
                      นักศึกษา
                    </Button>
                    <Title>เลือกสาขาวิชา</Title>
                  </Header>
                }
                mode='dropdown'
                selectedValue={faculty}
                onValueChange={this.onValueChange.bind(this)}>
                <Item label='เทคโนโลยีสารสนเทศ' value='เทคโนโลยีสารสนเทศ' />
                <Item label='สาธารณสุขศาสตร์' value='สาธารณสุขศาสตร์' />
                <Item label='เคมี' value='เคมี' />
                <Item label='ชีววิทยา' value='ชีววิทยา' />
                <Item label='วิทยาศาสตร์สิ่งแวดล้อม' value='วิทยาศาสตร์สิ่งแวดล้อม' />
                <Item label='คณิตศาสตร์ประยุกต์' value='คณิตศาสตร์ประยุกต์' />
                <Item label='คหกรรมศาสตร์' value='คหกรรมศาสตร์' />
                <Item label='วิทยาศาสตร์' value='วิทยาศาสตร์' />
                <Item label='เทคโนโลยีสถาปัตยกรรม' value='เทคโนโลยีสถาปัตยกรรม' />
                <Item label='เทคโนโลยีอุตสาหการ' value='เทคโนโลยีอุตสาหการ' />
              </Picker>
            </Item>
            <Item style={{ marginRight: 15 }}>
            <Picker
                headerComponent={
                  <Header>
                    <Button transparent>
                      นักศึกษา
                    </Button>
                    <Title>สถานะ</Title>
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

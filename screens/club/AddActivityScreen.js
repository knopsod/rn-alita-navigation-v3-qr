import React from 'react'
import { Text, StyleSheet, AsyncStorage, Alert } from 'react-native'
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form
} from "native-base";

import firebase from '../../Firebase'

export default class AddActivityScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      _key: navigation.getParam('_key', ''),
      id: navigation.getParam('id', ''),
      name: navigation.getParam('name', ''),
      operationDepartment: navigation.getParam('operationDepartment', ''),
      characteristic: navigation.getParam('characteristic', ''),
      objective: navigation.getParam('objective', ''),
      location: navigation.getParam('location', ''),
      period: navigation.getParam('period', ''),
      plan: navigation.getParam('plan', ''),
      userId: navigation.getParam('userId', '')
    };

    AsyncStorage.getItem('userId')
      .then(value => this.setState({ userId: value }));
  }
  onPress = () => {
    const { 
      id,
      name,
      operationDepartment,
      characteristic,
      objective,
      location,
      period,
      plan
    } = this.state;

    if ( id === '' ||
      name === '' ||
      operationDepartment === '' ||
      characteristic === '' ||
      objective === '' ||
      location === '' ||
      period === '' ||
      plan === ''
    ) 
    {
      alert('กรุณาใส่ข้อมูลให้ครบ');
      return;  
    }

    // https://www.youtube.com/watch?v=BWIN4JBm0-k&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=6
    // https://github.com/nathvarun/React-Native-Firebase-Tutorials/blob/master/Project%20Files/4%265%20Swipeable%20Lists/Complete/App.js
    var key = this.state._key ? this.state._key : firebase.database().ref('Activities').push().key;
    var set = firebase.database().ref('Activities').child(key).set({ ...this.state, _key: key });
    set.then((data) => {
        this.setState({
          id: '',
          name: '',
          operationDepartment: '',
          characteristic: '',
          objective: '',
          location: '',
          period: '',
          plan: ''
        });

        this.props.navigation.goBack();
    });
  }
  onDelete = () => {
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
            const { _key } = this.state;
            var ref = firebase.database().ref('Activities');
            var query = ref.orderByChild('_key').equalTo(_key);
            query.on('child_added', snapshot => {
              snapshot.ref.remove();
              this.props.navigation.goBack();
            })
          }
        }
      ],
      { cancelable: false }
    )
  }
  render() {
    const {
      _key,
      id,
      name,
      operationDepartment,
      characteristic,
      objective,
      location,
      period,
      plan
    } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Form style={{ marginTop: 20 }}>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="รหัสโครงการ" name="id"
                keyboardType="numeric"
                value={id}
                onChangeText={val => this.setState({ id: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="ชื่อโครงการ" name="name"
                value={name}
                onChangeText={val => this.setState({ name: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="ฝ่ายดำเนินการ" name="operationDepartment"
                value={operationDepartment}
                onChangeText={val => this.setState({ operationDepartment: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="ลักษณะของโครงการ" name="characteristic"
                value={characteristic}
                onChangeText={val => this.setState({ characteristic: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="วัตถุประสงค์" name="objective"
                value={objective}
                onChangeText={val => this.setState({ objective: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="สถานที่จัดกิจกรรม" name="location"
                value={location}
                onChangeText={val => this.setState({ location: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="ระยะเวลา" name="period"
                value={period}
                onChangeText={val => this.setState({ period: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="ผู้เข้าร่วมกิจกรรม" name="users"
                />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="แผนการดำเนินการ" name="plan"
                value={plan}
                onChangeText={val => this.setState({ plan: val })} />
            </Item>
          </Form>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={() => this.onPress()}>
            <Text style={{ color: '#fff' }}>{ _key ? 'บันทึก' : 'สร้างใหม่'}</Text>
          </Button>
          { _key !== '' && <Button block danger style={{ margin: 5, marginTop: 5 }}
            onPress={() => this.onDelete()}>
            <Text style={{ color: '#fff' }}>ลบ</Text>
          </Button> }
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
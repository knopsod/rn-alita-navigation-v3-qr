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

export default class AddActivityScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      _key: '',
      activityKey: navigation.getParam('_key', ''),
      detail: '',
      amount: 0,
      reports: [],
    };

    this.child = firebase.database().ref().child('Reportings').orderByChild('activityKey').equalTo(navigation.getParam('_key'));
    this.ref = firebase.database().ref().child('Reportings');
  }
  componentDidMount() {
    // https://www.youtube.com/watch?v=Di607bTqhPc&t=2186s
    // https://github.com/rayn-studios-learning/message-board-app/blob/master/App.js
    this.child.on('child_added', snapshot => {
      const data = snapshot.val();
      if (data) {
        this.setState(prevState => ({
          reports: [data, ...prevState.reports]
        }))
      }
    });

    this.child.on('child_removed', snapshot => {
      const { _key } = snapshot.val();

      this.setState({
        reports: this.state.reports.filter(element => element._key !== _key)
      });
    })
  }
  onPress = () => {
    const { 
      activityKey,
      detail,
      amount
    } = this.state;

    // https://www.youtube.com/watch?v=BWIN4JBm0-k&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=6
    // https://github.com/nathvarun/React-Native-Firebase-Tutorials/blob/master/Project%20Files/4%265%20Swipeable%20Lists/Complete/App.js
    var key = this.state._key ? this.state._key : firebase.database().ref('Reportings').push().key;
    var set = firebase.database().ref('Reportings').child(key).set({ activityKey, detail, amount, _key: key });
    set.then((data) => {
        this.setState({
          detail: '',
          amount: 0
        });

        // this.props.navigation.goBack();
    });
  }
  confirmRemove(data) {
    const { _key, detail, amount } = data;
    Alert.alert(
      'ลบ',
      `${detail} ${amount}`,
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
    const { reports } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Form style={{ marginTop: 20 }}>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="รายละเอียด" name="detail"
                value={this.state.detail}
                onChangeText={val => this.setState({ detail: val })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="ค่าใช้จ่าย" name="amount"
                keyboardType="numeric"
                value={this.state.amount.toString(10)}
                onChangeText={val => this.setState({ amount: parseInt(val, 10) })} />
            </Item>
          </Form>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={() => this.onPress()}>
            <Text style={{ color: '#fff' }}>{ this.state._key ? 'บันทึก' : 'สร้างใหม่'}</Text>
          </Button>
          <List
            dataArray={reports}
            renderRow={data => {
              return <ListItem
                button
                onPress={() => this.confirmRemove(data)}
              >
                <Left>
                  <Text>
                    {data.detail}
                  </Text>
                </Left>
                <Right>
                  <Text>
                    {data.amount.toString(10)}
                  </Text>
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
import React from 'react'
import { Text, StyleSheet } from 'react-native'
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
                value={this.state.amount}
                onChangeText={val => this.setState({ amount: val })} />
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
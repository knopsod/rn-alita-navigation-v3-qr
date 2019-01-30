import React from 'react'
import { Text, StyleSheet } from 'react-native'
import {
  Container,
  Content,
  Button,
  List,
  ListItem,
  Left,
  Right,
  Icon
} from "native-base";

import firebase from '../../Firebase'

export default class OfficersScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }

    this.child = firebase.database().ref().child('Users');
  }
  componentDidMount() {
    // https://www.youtube.com/watch?v=Di607bTqhPc&t=2186s
    // https://github.com/rayn-studios-learning/message-board-app/blob/master/App.js
    this.child.on('child_added', snapshot => {
      const data = snapshot.val();
      if (data) {
        this.setState(prevState => ({
          users: [data, ...prevState.users]
        }))
      }
    });
    
    this.child.on('child_changed', snapshot => {
      const changedUser = Object.assign({}, snapshot.val());
      const { users } = this.state;
      const filledUsers = users.filter(element => element._key !== changedUser._key);
      filledUsers.unshift(changedUser);
      this.setState({ 
        users: filledUsers
      });
    });
  }
  
  render() {
    const { users } = this.state;
    const officers = users.filter(
      element => element.status && 
        ( element.status.toLowerCase() === 'o' )
    );

    return (
      <Container style={styles.container}>
        <Content>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('AddOfficerScreen')}>
            <Text style={{ color: '#fff' }}>สร้างใหม่</Text>
          </Button>
          <List
            dataArray={officers}
            renderRow={data => {
              return <ListItem
                button
                onPress={() => {
                  this.props.navigation.navigate('AddOfficerScreen', data)
                }}
              >
                <Left>
                  <Text>
                    {data.userId}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
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
  },
    listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5
  },
  listItem: {
    fontSize: 20,
    padding: 10,
  }
});
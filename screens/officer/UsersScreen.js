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

export default class UsersScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
  }
  componentDidMount() {
    // https://www.youtube.com/watch?v=Di607bTqhPc&t=2186s
    // https://github.com/rayn-studios-learning/message-board-app/blob/master/App.js
    firebase
      .database()
      .ref()
      .child('Users')
      .on('child_added', snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            users: [data, ...prevState.users]
          }))
        }
      });
    
    // Can't update this.state.users
    // firebase
    //   .database()
    //   .ref()
    //   .child('Users')
    //   .on('child_changed', snapshot => {
    //     const { _key } = snapshot.val();
    //     let { users } = this.state;
    //     let foundIndex = users.findIndex(element => element._key === _key);
    //     users.splice(foundIndex, 0, snapshot.val());
    //     this.setState({...users});
    //     console.log(users);
    //   });
  }
  
  render() {
    const { users } = this.state;

    return (
      <Container style={styles.container}>
        <Content>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('AddUserScreen')}>
            <Text style={{ color: '#fff' }}>สร้างใหม่</Text>
          </Button>
          <List
            dataArray={users}
            renderRow={data => {
              return <ListItem
                button
                onPress={() => this.props.navigation.navigate('AddUserScreen', data)}
              >
                <Left>
                  <Text>
                    {data.username}
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
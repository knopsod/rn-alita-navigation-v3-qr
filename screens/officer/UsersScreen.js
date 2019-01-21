import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form
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
    // https://medium.com/mindorks/firebase-realtime-database-with-react-native-5f357c6ee13b
    // firebase.database().ref('Users/').on('value', function(snapshot) {
      // https://stackoverflow.com/questions/47009264/rendering-data-in-flatlist-from-firebase
      // console.log(snapshot.val());
      // console.log(Object.entries(snapshot.val()).map(item => ({ ...item[1], key: item[0]})));
      // const data = snapshot.val();
      
      // if(data) {
      //   const users = Object.entries(data).map(item => ({ ...item[1], key: item[0]}));
      //   console.log(users);

      //     this.setState(prevState => ({
        //       users: [users, ...prevState.users]
        //     }))
        //   }
        // });
    
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

    setTimeout(() => {
      console.log(this.state);
    }, 2000);
  }
  
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Button block style={{ margin: 15, marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('AddUserScreen')}>
            <Text style={{ color: '#fff' }}>สร้างใหม่</Text>
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
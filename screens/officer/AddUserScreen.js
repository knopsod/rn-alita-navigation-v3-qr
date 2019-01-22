import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
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
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      studentId: '',
      firstName: '',
      lastName: ''
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
      alert('Please complete data.');
      return;  
    }

    // https://medium.com/mindorks/firebase-realtime-database-with-react-native-5f357c6ee13b
    firebase.database().ref('Users').push(this.state)
      .then((data) => {
        this.setState({
          username: '',
          password: '',
          confirmPassword: '',
          studentId: '',
          firstName: '',
          lastName: ''
        });

        this.props.navigation.goBack();
      })
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
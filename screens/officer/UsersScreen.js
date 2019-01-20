import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from "native-base";


export default class UsersScreen extends React.Component {
  componentWillMount() {
    
  }
  render() {
    return (
      <View style={{...styles.container}}>
        <Text>UsersScreen</Text>
        <Button block style={{ margin: 15, marginTop: 50 }}
          onPress={() => this.props.navigation.navigate('AddUserScreen')}>
          <Text style={{ color: '#fff' }}>Add User</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1
  }
});
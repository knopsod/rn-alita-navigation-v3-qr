import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class AddUserScreen extends React.Component {
  render() {
    return (
      <View style={{...styles.container}}>
        <Text>AddUserScreen</Text>
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
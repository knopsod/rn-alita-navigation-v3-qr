import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class OfficerProfileScreen extends Component {
  render() {
    return (
      <View style={{...styles.container}}>
        <Text>OfficerProfileScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1
  }
});

import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from "native-base";

export default class ReportingScreen extends Component {
  render() {
    return (
      <View style={{...styles.container}}>
        <Text> ReportingScreen </Text>
        <Button block style={{ margin: 15, marginTop: 50 }}
          onPress={() => this.props.navigation.navigate('AddReportScreen')}>
          <Text style={{ color: '#fff' }}>Add Report</Text>
        </Button>
      </View>
    )
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

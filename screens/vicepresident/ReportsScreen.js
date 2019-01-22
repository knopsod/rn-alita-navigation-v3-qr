import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from "native-base";

export default class ReportsScreen extends React.Component {
  render() {
    return (
      <View style={{...styles.container}}>
        <Text>ReportsScreen</Text>
        <Button block style={{ margin: 5, marginTop: 50 }}
          onPress={() => this.props.navigation.navigate('ReportDetailScreen')}>
          <Text style={{ color: '#fff' }}>Go to Report detail</Text>
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

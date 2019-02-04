import React, { Component } from 'react'
import { Text, View, StyleSheet, AsyncStorage } from 'react-native'

export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      activityKey: ''
    };

    AsyncStorage.getItem('activityKey')
      .then(value => this.setState({ activityKey: value }));
  }
  render() {
    const { activityKey } = this.state;
    return (
      <View style={{...styles.container}}>
        <Text>{ activityKey }</Text>
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

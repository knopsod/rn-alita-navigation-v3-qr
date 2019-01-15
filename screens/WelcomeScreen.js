import React from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={{...styles.container}}>
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentRole')}>
          <Text>Sign-in as นักศึกษา</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ClubRole')}>
          <Text>Sign-in as สโมสร</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('OfficerRole')}>
          <Text>Sign-in as เจ้าหน้าที่</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('VicePresidentRole')}>
          <Text>Sign-in as รองคณบดีฯ</Text>
        </TouchableOpacity>
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

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { 
  createAppContainer, 
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  FlatList
} from 'react-navigation';

import { StudentDrawerNavigator } from './navigations/Student';
import { OfficerDrawerNavigator } from './navigations/Officer';
import { ClubDrawerNavigator } from './navigations/Club';
import { VicePresidentDrawerNavigator } from './navigations/VicePresident';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

class WelcomeScreen extends React.Component {
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

// Switch --------------------------------------------
const AppSwitchNavigator = createSwitchNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    StudentRole: { screen: StudentDrawerNavigator },
    OfficerRole: { screen: OfficerDrawerNavigator },
    ClubRole: { screen: ClubDrawerNavigator },
    VicePresidentRole: { screen: VicePresidentDrawerNavigator }
  }
);

// Container --------------------------------------------
const AppContainer = createAppContainer(AppSwitchNavigator);

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

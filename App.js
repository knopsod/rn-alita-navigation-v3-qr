import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Body,
  Left,
  Right,
  Item,
  Input,
  Form
} from "native-base";
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

import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

// Switch --------------------------------------------
const AppSwitchNavigator = createSwitchNavigator(
  {
    WelcomeScreen: { screen: WelcomeScreen },
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
    backgroundColor: "orange"
  }
});

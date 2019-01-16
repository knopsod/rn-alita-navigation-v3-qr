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
      <Container style={styles.container}>
        <Content>
          <Form style={{ marginTop: 200 }}>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="Username" />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="Password" secureTextEntry />
            </Item>
          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }}
            onPress={() => this.props.navigation.navigate('StudentRole')}>
            <Text>Sign In as นักศึกษา</Text>
          </Button>
          <Button block style={{ margin: 15 }}
            onPress={() => this.props.navigation.navigate('ClubRole')}>
            <Text>Sign In as สโมสร</Text>
          </Button>
          <Button block style={{ margin: 15 }}
            onPress={() => this.props.navigation.navigate('OfficerRole')}>
            <Text>Sign In as เจ้าหน้าที่</Text>
          </Button>
          <Button block style={{ margin: 15 }}
            onPress={() => this.props.navigation.navigate('VicePresidentRole')}>
            <Text>Sign In as รองคณบดี</Text>
          </Button>
        </Content>
      </Container>
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
    backgroundColor: "orange"
  }
});

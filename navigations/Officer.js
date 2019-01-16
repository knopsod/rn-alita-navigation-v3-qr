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

import WelcomeScreen from '../screens/WelcomeScreen';

class UsersScreen extends React.Component {
  render() {
    return (
      <View style={{...styles.container}}>
        <Text>UsersScreen</Text>
      </View>
    );
  }
}

const UsersStack = createStackNavigator(
  {
    UsersScreen: {
      screen: UsersScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Users',
          headerLeft: (
            <Icon 
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu" size={30} />
          )
        }
      }
    }
  }
);

const UsersTabNavigator = createBottomTabNavigator(
  {
    Users: UsersStack
  }, {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      }
    }
  }
);

const UsersStackNavigator = createStackNavigator(
  {
    UsersTabNavigator: UsersTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon 
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu" size={30} />
        )
      }
    }
  }
);

export const OfficerDrawerNavigator = createDrawerNavigator(
  {
    Dashboard: UsersStackNavigator,
    SigOut: { 
      screen: WelcomeScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Sign-out'
      })
    }
  }
)

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

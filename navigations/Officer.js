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

import UsersScreen from '../screens/officer/UsersScreen';
import AddUserScreen from '../screens/officer/AddUserScreen';

import OfficersScreen from '../screens/officer/OfficersScreen';
import AddOfficerScreen from '../screens/officer/AddOfficerScreen';

import VicePresidentsScreen from '../screens/officer/VicePresidentsScreen';
import AddVicePresidentScreen from '../screens/officer/AddVicePresidentScreen';

const UsersStack = createStackNavigator(
  {
    UsersScreen: {
      screen: UsersScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'นักศึกษา',
          headerLeft: (
            <Icon 
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.openDrawer()}
              name="md-menu" size={30} />
          ),
          headerStyle: {
            backgroundColor: 'orange'
          }
        }
      }
    },
    AddUserScreen: {
      screen: AddUserScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'นักศึกษา',
          headerStyle: {
            backgroundColor: 'orange'
          }
        }
      }
    }
  }
);

const OfficersStack = createStackNavigator(
  {
    OfficersScreen: {
      screen: OfficersScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'เจ้าหน้าที่',
          headerLeft: (
            <Icon 
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.openDrawer()}
              name="md-menu" size={30} />
          ),
          headerStyle: {
            backgroundColor: 'orange'
          }
        }
      }
    },
    AddOfficerScreen: {
      screen: AddOfficerScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'เจ้าหน้าที่',
          headerStyle: {
            backgroundColor: 'orange'
          }
        }
      }
    }
  }
);

const VicePresidentsStack = createStackNavigator(
  {
    VicePresidentsScreen: {
      screen: VicePresidentsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'รองคณบดี',
          headerLeft: (
            <Icon 
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.openDrawer()}
              name="md-menu" size={30} />
          ),
          headerStyle: {
            backgroundColor: 'orange'
          }
        }
      }
    },
    AddVicePresidentScreen: {
      screen: AddVicePresidentScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'รองคณบดี',
          headerStyle: {
            backgroundColor: 'orange'
          }
        }
      }
    }
  }
);

const UsersTabNavigator = createBottomTabNavigator(
  {
    Users: {
      screen: UsersStack,
      navigationOptions: {
        title: 'นักศึกษา'
      }
    },
    Officers: {
      screen: OfficersStack,
      navigationOptions: {
        title: 'เจ้าหน้าที่'
      }
    },
    VicePresidents: {
      screen: VicePresidentsStack,
      navigationOptions: {
        title: 'รองคณบดี'
      }
    }
  }, {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      }
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        // let IconComponent = Ionicons;
        let IconComponent = Icon;
        let iconName;
        if (routeName === 'Users') {
          // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          iconName = `md-body`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge; 
        } else if (routeName === 'Officers') {
          // iconName = `ios-options${focused ? '' : '-outline'}`;
          iconName = `md-key`;
        } else if (routeName === 'VicePresidents') {
          // iconName = `ios-options${focused ? '' : '-outline'}`;
          iconName = `md-person`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'orange',
      },
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

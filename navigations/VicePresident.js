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
import ReportsScreen from '../screens/vicepresident/ReportsScreen';
import ReportDetailScreen from '../screens/vicepresident/ReportDetailScreen';

const ReportsStack = createStackNavigator(
  {
    ReportsScreen: {
      screen: ReportsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Reports',
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
    ReportDetailScreen: {
      screen: ReportDetailScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Report detail',
          headerStyle: {
            backgroundColor: 'orange'
          }
        }
      }
    }
  }
);

const VicePresidentTabNavigator = createBottomTabNavigator(
  {
    Reports: { 
      screen: ReportsStack,
      navigationOptions: {
        tabBarVisible: false
      }  
    }
  }, {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName,
      }
    }
  }
);

const VicePresidentStackNavigator = createStackNavigator(
  {
    VicePresidentTabNavigator: VicePresidentTabNavigator
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

export const VicePresidentDrawerNavigator = createDrawerNavigator(
  {
    Dashboard: VicePresidentStackNavigator,
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

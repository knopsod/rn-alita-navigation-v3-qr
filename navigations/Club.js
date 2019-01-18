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
import ActivityScreen from '../screens/club/ActivityScreen';
import ReportingScreen from '../screens/club/ReportingScreen';
import AddActivityScreen from '../screens/club/AddActivityScreen';
import AddReportScreen from '../screens/club/AddReportDetail';


const ActivityStack = createStackNavigator(
  {
    ActivityScreen: {
      screen: ActivityScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Activity',
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
    AddActivityScreen: {
      screen: AddActivityScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Add Activity',
          headerStyle: {
            backgroundColor: 'orange'
          }
        }
      }
    }
  }
);

const ReportingStack = createStackNavigator(
  {
    ReportingScreen: {
      screen: ReportingScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Reporting',
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
    AddReportScreen: {
      screen: AddReportScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Add Report',
          headerStyle: {
            backgroundColor: 'orange'
          }
        }
      }
    }
  }
);

const ClubTabNavigator = createBottomTabNavigator(
  {
    Activity: ActivityStack,
    Reporing: ReportingStack
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

const ClubStackNavigator = createStackNavigator(
  {
    ClubTabNavigator: ClubTabNavigator
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

export const ClubDrawerNavigator = createDrawerNavigator(
  {
    Dashboard: ClubStackNavigator,
    SigOut: { 
      screen: WelcomeScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Sign-out'
      })
    }
  }
);

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

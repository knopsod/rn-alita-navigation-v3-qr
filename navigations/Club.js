import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import { 
  createAppContainer, 
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  FlatList
} from 'react-navigation';

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
          headerTitle: 'กิจกรรม',
          headerLeft: (
            <Icon 
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu" size={30} />
          ),
          headerRight: (
            <Icon 
              style={{ paddingRight: 10 }}
              onPress={() => navigation.navigate('WelcomeScreen')}
              name="md-log-out" size={30} />
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
          headerTitle: 'กิจกรรม',
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
          headerTitle: 'รายงานกิจกรรม',
          headerLeft: (
            <Icon 
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu" size={30} />
          ),
          headerRight: (
            <Icon 
              style={{ paddingRight: 10 }}
              onPress={() => navigation.navigate('WelcomeScreen')}
              name="md-log-out" size={30} />
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
          headerTitle: 'รายงานกิจกรรม',
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
    Activity: {
      screen: ActivityStack,
      navigationOptions: {
        title: 'กิจกรรม'
      }
    },
    Reporting: {
      screen: ReportingStack,
      navigationOptions: {
        title: 'รายงานกิจกรรม'
      }
    },
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
        if (routeName === 'Activity') {
          // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          iconName = `md-bicycle`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge; 
        } else if (routeName === 'Reporting') {
          // iconName = `ios-options${focused ? '' : '-outline'}`;
          iconName = `md-clipboard`;
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
    Menu: ClubStackNavigator
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

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

import ScanScreen from '../screens/student/ScanScreen';
import HistoryScreen from '../screens/student/HistoryScreen';
import StudentProfileScreen from '../screens/student/StudentProfileScreen';

const ScanStack = createStackNavigator(
  {
    ScanScreen: {
      screen: ScanScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Scan',
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
    }
  }
);

const HistoryStack = createStackNavigator(
  {
    HistoryScreen: {
      screen: HistoryScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'History',
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
    }
  }
);

const StudentTabNavigator = createBottomTabNavigator(
  {
    Scan: ScanStack,
    History: HistoryStack
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
        if (routeName === 'Scan') {
          // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          iconName = `md-barcode`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge; 
        } else if (routeName === 'History') {
          // iconName = `ios-options${focused ? '' : '-outline'}`;
          iconName = `md-paper`;
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

const StudentStackNavigator = createStackNavigator(
  {
    StudentTabNavigator: StudentTabNavigator
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

const StudentProfileStackNavigator = createStackNavigator(
  {
    StudentProfileScreen: StudentProfileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
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
  }
);

export const StudentDrawerNavigator = createDrawerNavigator(
  {
    Menu: StudentStackNavigator,
    Profile: StudentProfileStackNavigator
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

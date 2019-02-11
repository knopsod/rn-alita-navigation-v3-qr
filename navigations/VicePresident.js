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

import ReportsScreen from '../screens/vicepresident/ReportsScreen';
import ReportDetailScreen from '../screens/vicepresident/ReportDetailScreen';
import ThumbnailReportDetailScreen from '../screens/vicepresident/ThumbnailReportDetailScreen';
import VicePresidentProfileScreen from '../screens/vicepresident/VicePresidentProfileScreen';

const ReportsStack = createStackNavigator(
  {
    ReportsScreen: {
      screen: ReportsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'รายงาน',
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
    ReportDetailScreen: {
      screen: ReportDetailScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'รายละเอียด',
          headerStyle: {
            backgroundColor: 'orange'
          }
        }
      }
    },
    ThumbnailReportDetailScreen: {
      screen: ThumbnailReportDetailScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'รูปกิจกรรม',
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

const VicePresidentProfileStackNavigator = createStackNavigator(
  {
    VicePresidentProfileScreen: VicePresidentProfileScreen
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

export const VicePresidentDrawerNavigator = createDrawerNavigator(
  {
    Menu: {
      screen: VicePresidentStackNavigator,
      navigationOptions: {
        title: 'เมนู'
      }
    },
    Profile: {
      screen: VicePresidentProfileStackNavigator,
      navigationOptions: {
        title: 'โปรไฟล์'
      }
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

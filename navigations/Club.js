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

class ActivityScreen extends React.Component {
  render() {
    return (
      <View style={{...styles.container}}>
        <Text>ActivityScreen</Text>
      </View>
    );
  }
}

class ReportingScreen extends React.Component {
  render() {
    return (
      <View style={{...styles.container}}>
        <Text>ReportingScreen</Text>
      </View>
    );
  }
}

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
          )
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
          )
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

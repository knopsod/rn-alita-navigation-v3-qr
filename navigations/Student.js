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

class ScanScreen extends React.Component {
  render() {
    return (
      <View style={{...styles.container}}>
        <Text>ScanScreen</Text>
      </View>
    );
  }
}

class HistoryScreen extends React.Component {
  render() {
    return (
      <View style={{...styles.container}}>
        <Text>HistoryScreen</Text>
      </View>
    );
  }
}

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
          )
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
          )
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

export const StudentDrawerNavigator = createDrawerNavigator(
  {
    Dashboard: StudentStackNavigator,
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

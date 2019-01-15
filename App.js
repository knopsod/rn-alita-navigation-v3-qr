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
      <View style={{...styles.container}}>
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentRole')}>
          <Text>Sign-in as นักศึกษา</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ClubRole')}>
          <Text>Sign-in as สโมสร</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('OfficerRole')}>
          <Text>Sign-in as เจ้าหน้าที่</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('VicePresidentRole')}>
          <Text>Sign-in as รองคณบดีฯ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Student sector --------------------------------------------
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

const StudentDrawerNavigator = createDrawerNavigator(
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

// Officer sector --------------------------------------------
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

const OfficerDrawerNavigator = createDrawerNavigator(
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

// Club sector --------------------------------------------
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

const ClubDrawerNavigator = createDrawerNavigator(
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

// Vice president sector --------------------------------------------
class ReportsScreen extends React.Component {
  render() {
    return (
      <View style={{...styles.container}}>
        <Text>ReportsScreen</Text>
      </View>
    );
  }
}

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
          )
        }
      }
    }
  }
);

const VicePresidentTabNavigator = createBottomTabNavigator(
  {
    Reports: ReportsStack
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

const VicePresidentDrawerNavigator = createDrawerNavigator(
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

import React from 'react'
import { Text, StyleSheet, Dimensions, AsyncStorage } from 'react-native'
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form,
  Thumbnail,
} from "native-base";

import firebase from '../Firebase';

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.child = firebase.database().ref().child('Users');
  }
  onPress = () => {
    const { navigation } = this.props;
    const { username } = this.state;    

    this.child.orderByChild('userId').equalTo(username).on('child_added', function(snapshot) {
      
      const data = snapshot.val();
      const { status } = snapshot.val();

      AsyncStorage.setItem('userId', data.userId);
      AsyncStorage.setItem('_userKey', data._key);

      switch (status.toLowerCase()) {
        case 's':
          navigation.navigate('StudentRole')    
          break;
        
        case 'c':
          navigation.navigate('ClubRole', data);
          break;
        
        case 'o':
          navigation.navigate('OfficerRole')    
          break;
      
        case 'v':
          navigation.navigate('VicePresidentRole')    
          break;
      
        default:
          break;
      }
    })
  }
  render() {
    const halfWidth = Dimensions.get('screen').width/2 - 70;
    return (
      <Container style={styles.container}>
        <Content style={{ marginTop: 80 }}>
          <Form>
            <Form style={{ marginLeft: halfWidth }}>
              <Thumbnail large source={require('../assets/logo.jpg')}
                style={{ borderRadius: 70, width: 140, height: 140 }}/>
            </Form>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="Username"
                keyboardType="numeric"
                onChangeText={text => this.setState({ username: text })} />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="Password" secureTextEntry
                onChangeText={text => this.setState({ password: text })} />
            </Item>
            <Button block style={{ margin: 5, marginTop: 30 }}
              onPress={() => this.onPress()}>
              <Text style={{ color: '#fff' }}>Sign-in</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange"
  }
});

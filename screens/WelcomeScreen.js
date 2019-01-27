import React from 'react'
import { Text, StyleSheet } from 'react-native'
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form,
  Thumbnail,
} from "native-base";

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }
  onPress = () => {
    const { navigation } = this.props;
    const { username } = this.state;

    switch (username.toLowerCase()) {
      case 's':
        navigation.navigate('StudentRole')    
        break;
      
      case 'c':
        navigation.navigate('ClubRole')    
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
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content style={{ marginTop: 150 }}>
          <Form>
            <Form style={{ marginLeft: 135 }}>
              <Thumbnail large source={require('../assets/ict.jpg')}/>
            </Form>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="Username"
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

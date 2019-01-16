import React from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Body,
  Left,
  Right,
  Item,
  Input,
  Form
} from "native-base";

class WelcomeScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form style={{ marginTop: 200 }}>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="Username" />
            </Item>
            <Item style={{ marginRight: 15 }}>
              <Input placeholder="Password" secureTextEntry />
            </Item>
          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }}
            onPress={() => this.props.navigation.navigate('StudentRole')}>
            <Text>Sign In as นักศึกษา</Text>
          </Button>
          <Button block style={{ margin: 15 }}
            onPress={() => this.props.navigation.navigate('ClubRole')}>
            <Text>Sign In as สโมสร</Text>
          </Button>
          <Button block style={{ margin: 15 }}
            onPress={() => this.props.navigation.navigate('OfficerRole')}>
            <Text>Sign In as เจ้าหน้าที่</Text>
          </Button>
          <Button block style={{ margin: 15 }}
            onPress={() => this.props.navigation.navigate('VicePresidentRole')}>
            <Text>Sign In as รองคณบดี</Text>
          </Button>
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

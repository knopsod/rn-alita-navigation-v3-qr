import React from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Thumbnail,
  Body
} from "native-base";
import QRCode from 'react-native-qrcode';

export default class QRCodeGeneratorScreen extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = props;

    this.state = {
      _key: navigation.getParam('_key', ''),
    };
  }
  
  render() {
    const halfWidth = Dimensions.get('screen').width/2;
    const scWidth = Dimensions.get('screen').width - 10;
    const { _key } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Form style={{ marginTop: 15, marginLeft: 5, marginRight: 5, marginBottom: 15 }}>
          <QRCode
            value={_key}
            size={scWidth}
            bgColor='black'
            fgColor='white'/>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange"
  }
});
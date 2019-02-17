import React from 'react'
import { Text, StyleSheet, Dimensions, CameraRoll, Alert } from 'react-native'
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

// https://stackoverflow.com/questions/54214964/unable-to-resolve-patternreg-from-node-modules-react-native-svg-lib-extract
// import QRCode from 'react-native-qrcode-svg';

// https://www.npmjs.com/package/react-native-view-shot
// https://github.com/facebook/react-native/issues/16223
// https://facebook.github.io/react-native/docs/cameraroll
import ViewShot from "react-native-view-shot";

export default class QRCodeGeneratorScreen extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = props;

    this.state = {
      _key: navigation.getParam('_key', ''),
    };
  }

  onDownload = () => {
    this.refs.viewShot.capture().then(async (uri) => {
      console.log("do something with ", uri);
      let saveResult = await CameraRoll.saveToCameraRoll(uri, 'photo');
      if (saveResult) {
        Alert.alert('บันทึก', 'สำเร็จ');
      }
    });
  }
  
  render() {
    const halfWidth = Dimensions.get('screen').width/2;
    const scWidth = Dimensions.get('screen').width - 10;
    const { _key } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Form style={{ marginTop: 15, marginLeft: 5, marginRight: 5, marginBottom: 15 }}>
            <ViewShot ref="viewShot" 
              options={{ format: "jpg", quality: 0.9 }}>
              <QRCode
                value={_key}
                size={scWidth}
                bgColor='black'
                fgColor='white' />
            </ViewShot>
            {/* <QRCode
              value={_key}
              size={scWidth}
              getRef={(c) => (this.svg = c)} /> */}
          </Form>
          <Button block style={{ margin: 5, marginTop: 5 }}
            onPress={() => this.onDownload()}>
            <Text>ดาวน์โหลด</Text>
          </Button>
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
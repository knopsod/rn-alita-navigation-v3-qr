import React, { Component } from 'react'
import { Text, View, StyleSheet, AsyncStorage } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'

export default class ScanScreen extends Component {
  // https://docs.expo.io/versions/v32.0.0/sdk/bar-code-scanner/
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
    }

  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  handleBarCodeScanned = ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const { navigation } = this.props;
    
    AsyncStorage.setItem('scanned', 'scanned');
    AsyncStorage.setItem('activityKey', data);
    navigation.navigate('History');
  }
  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1
  }
});

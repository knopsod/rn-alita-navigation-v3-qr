import React, { Component } from 'react'
import { Text, StyleSheet, AsyncStorage } from 'react-native'
import {
  Container,
  Content,
  Button,
  List,
  ListItem,
  Left,
  Right,
  Icon
} from "native-base";

import firebase from '../../Firebase'

export default class QRCodesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: []
    }

    AsyncStorage.getItem('userId')
      .then(value => {
        this.child = firebase.database().ref().child('Activities').orderByChild('userId').equalTo(value);

        // https://www.youtube.com/watch?v=Di607bTqhPc&t=2186s
        // https://github.com/rayn-studios-learning/message-board-app/blob/master/App.js
        this.child.on('child_added', snapshot => {
          const data = snapshot.val();
          if (data) {
            this.setState(prevState => ({
              activities: [data, ...prevState.activities]
            }))
          }
        });
      });
  }
  render() {
    const { activities } = this.state;

    return (
      <Container style={styles.container}>
        <Content>
          <List
            dataArray={activities}
            renderRow={data => {
              return <ListItem
                button
                onPress={() => this.props.navigation.navigate('QRCodeGeneratorScreen', data)}
              >
                <Left>
                  <Text>
                    {data.name}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
            }
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange"
  },
    listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5
  },
  listItem: {
    fontSize: 20,
    padding: 10,
  }
});
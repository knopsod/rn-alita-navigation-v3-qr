import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
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
  Icon
} from "native-base";

import firebase from '../../Firebase'

export default class ReportDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      _key: '',
      activityKey: navigation.getParam('_key', ''),
      reports: [],
    };

    this.child = firebase.database().ref().child('Reportings').orderByChild('activityKey').equalTo(navigation.getParam('_key'));
    this.ref = firebase.database().ref().child('Reportings');
  }
  componentDidMount() {
    // https://www.youtube.com/watch?v=Di607bTqhPc&t=2186s
    // https://github.com/rayn-studios-learning/message-board-app/blob/master/App.js
    this.child.on('child_added', snapshot => {
      const data = snapshot.val();
      if (data) {
        this.setState(prevState => ({
          reports: [data, ...prevState.reports]
        }))
      }
    });
  }
  render() {
    const { reports } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <List
            dataArray={reports}
            renderRow={data => {
              return <ListItem
                button
                onPress={() => this.confirmRemove(data)}
              >
                <Left>
                  <Text>
                    {data.detail}
                  </Text>
                </Left>
                <Right>
                  <Text>
                    {data.amount.toString(10)}
                  </Text>
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
  }
});
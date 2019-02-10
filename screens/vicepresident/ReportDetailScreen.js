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
      checkIns: [],
    };

    this.child = firebase.database().ref().child('Reportings').orderByChild('activityKey').equalTo(navigation.getParam('_key'));
    this.ref = firebase.database().ref().child('Reportings');

    this.checkInsChild = firebase.database().ref().child('CheckIns').orderByChild('activityKey').equalTo(navigation.getParam('_key'));
    this.checkInsRef = firebase.database().ref().child('CheckIns');
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

    this.checkInsChild.on('child_added', snapshot => {
      const data = snapshot.val();
      if (data) {
        this.setState(prevState => ({
          checkIns: [data, ...prevState.checkIns]
        }))
      }
    });
  }
  render() {
    const { reports, checkIns } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Form style={{ marginTop: 15, marginLeft: 5, marginRight: 5 }}>
            <Text>{`จำนวนผู้เข้าร่วมกิจกรรม : ${checkIns.length} คน`}</Text>
          </Form>
          <Form style={{ marginTop: 15, marginLeft: 5, marginRight: 5 }}>
            <Text>{`รายละเอียด`}</Text>
          </Form>
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
                    {`${data.amount.toString(10)} บาท`}
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
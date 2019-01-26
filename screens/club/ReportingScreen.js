import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
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

export default class ReportingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: []
    }

    this.child = firebase.database().ref().child('Reportings');
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

    this.child.on('child_changed', snapshot => {
      const changedReport = Object.assign({}, snapshot.val());
      const { reports } = this.state;
      const filledReports = reports.filter(element => element._key !== changedReport._key);
      filledReports.unshift(changedReport);
      this.setState({ 
        reports: filledReports
      });
    });
  }
  render() {
    const { reports } = this.state;

    return (
      <Container style={styles.container}>
        <Content>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('AddReportScreen')}>
            <Text style={{ color: '#fff' }}>สร้างใหม่</Text>
          </Button>
          <List
            dataArray={reports}
            renderRow={data => {
              return <ListItem
                button
                onPress={() => this.props.navigation.navigate('AddReportScreen', data)}
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
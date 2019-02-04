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

export default class ActivityScreen extends Component {
  constructor(props) {
    super(props);    

    this.state = {
      activities: [],
    }

    
    AsyncStorage.getItem('userId')
      .then((value) => {
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

        this.child.on('child_changed', snapshot => {
          const changedActivity = Object.assign({}, snapshot.val());
          const { activities } = this.state;
          const filledActivities = activities.filter(element => element._key !== changedActivity._key);
          filledActivities.unshift(changedActivity);
          this.setState({
            activities: filledActivities
          });
        });

        this.child.on('child_removed', snapshot => {
          const { _key } = snapshot.val();
          const { activities } = this.state;
          const filledActivities = activities.filter(element => element._key !== _key);
          this.setState({
            activities: filledActivities
          });
        })
      });
  }
  render() {
    const { activities } = this.state;

    return (
      <Container style={styles.container}>
        <Content>
          <Button block style={{ margin: 5, marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('AddActivityScreen')}>
            <Text style={{ color: '#fff' }}>สร้างใหม่</Text>
          </Button>
          <List
            dataArray={activities}
            renderRow={data => {
              const { id, name } = data;
              return <ListItem
                button
                onPress={() => this.props.navigation.navigate('AddActivityScreen', data)}
              >
                <Left>
                  <Text>
                    {`${id} ${name}`}
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
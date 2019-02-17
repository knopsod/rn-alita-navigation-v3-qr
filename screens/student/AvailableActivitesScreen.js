import React, { Component } from 'react'
import { Text, View, StyleSheet, AsyncStorage } from 'react-native'
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

export default class AvailableActivitiesScreen extends React.Component {
  constructor(props) {
    super(props);    

    this.state = {
      userId: '',
      checkIns: [],
      activities: [],
    }

    this.child = firebase.database().ref().child('Activities');

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

    AsyncStorage.getItem('userId')
      .then(userId => {
        this.setState({ userId });
        
        this.userChild = firebase.database().ref().child('CheckIns').orderByChild('userId').equalTo(userId);
    
        // https://www.youtube.com/watch?v=Di607bTqhPc&t=2186s
        // https://github.com/rayn-studios-learning/message-board-app/blob/master/App.js
        this.userChild.on('child_added', snapshot => {
          const data = snapshot.val();
          
          if (data) {
            this.setState(prevState => ({
              checkIns: [data, ...prevState.checkIns],
            }));            
          }
        });
      });
  }
  render() {
    const { checkIns, activities } = this.state;

    const filledActivities = activities.filter(
      act => {
        return !checkIns.find(ci => {
          return act._key === ci.activityKey;
        });
      }
    );

    console.log('filledActivities: ', filledActivities);

    return (
      <Container style={styles.container}>
        <Content>
          <List
            dataArray={filledActivities}
            renderRow={data => {
              const { id, name } = data;
              return <ListItem
                button
                onPress={() => this.props.navigation.navigate('AvailableDetailScreen', data)}
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

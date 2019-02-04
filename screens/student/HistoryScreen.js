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

export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      activityKey: '',
      userId: '',
      checkIns: [],
    };

    AsyncStorage.getItem('activityKey')
      .then(activityKey => {
        console.log(activityKey);
        this.setState({ activityKey });
        
        AsyncStorage.getItem('userId')
          .then(userId => {
            console.log(userId);
            this.setState({ userId });

            // https://www.youtube.com/watch?v=BWIN4JBm0-k&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=6
            // https://github.com/nathvarun/React-Native-Firebase-Tutorials/blob/master/Project%20Files/4%265%20Swipeable%20Lists/Complete/App.js
            var key = firebase.database().ref('CheckIns').push().key;
            var set = firebase.database().ref('CheckIns').child(key)
              .set({ activityKey: this.state.activityKey, userId: this.state.userId, _key: key });

            set.then(data => {
              
            });

            this.child = firebase.database().ref().child('CheckIns').orderByChild('userId').equalTo(userId);

            // https://www.youtube.com/watch?v=Di607bTqhPc&t=2186s
            // https://github.com/rayn-studios-learning/message-board-app/blob/master/App.js
            this.child.on('child_added', snapshot => {
              const data = snapshot.val();
              console.log(data);
              if (data) {
                this.setState(prevState => ({
                  checkIns: [data, ...prevState.checkIns]
                }));
              }
            });

            
          });
      });
  }
  render() {
    const { checkIns } = this.state;
    console.log('render', checkIns);

    return (
      <Container style={styles.container}>
        <Content>
          <List
            dataArray={checkIns}
            renderRow={data => {
              const { activityKey, userId } = data;
              return <ListItem
                button
              >
                <Left>
                  <Text>
                    {`Activity Key: ${activityKey}, User ID: ${userId}`}
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
    )
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

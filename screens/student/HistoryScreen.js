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
import moment from 'moment';
import firebase from '../../Firebase'

export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      activityKey: '',
      userId: '',
      checkIns: [],
      activities: [],
    };

    
    AsyncStorage.getItem('userId')
      .then(userId => {
        this.setState({ userId });
        this.child = firebase.database().ref().child('CheckIns').orderByChild('userId').equalTo(userId);
    
        // https://www.youtube.com/watch?v=Di607bTqhPc&t=2186s
        // https://github.com/rayn-studios-learning/message-board-app/blob/master/App.js
        this.child.on('child_added', snapshot => {
          const data = snapshot.val();
          
          if (data) {
            this.setState(prevState => ({
              checkIns: [data, ...prevState.checkIns],
            }));            
          }
        });
      });

  }
  componentDidMount() {
    const { navigation } = this.props;

    // https://stackoverflow.com/questions/50290818/react-navigation-detect-when-screen-tabbar-is-activated-appear-focus-blu
    this.subs = [
      navigation.addListener('didFocus', (payload) => {

        // firebase.database().ref('Activities/' + data.activityKey).once('value', actSnapshot => {
        //   this.setState(prevState => ({
        //     activities: [actSnapshot.val(), ...prevState.activities],
        //   }));

        //   if (this.state.checkIns.length === this.state.activities.length) {
        //     var ci = this.state.checkIns;
        //     var act = this.state.activities;

        //     ci.forEach(ciElement => {
        //       ciElement.activityName = act.find(actElement => actElement._key === ciElement.activityKey).name;
        //     });

        //     this.setState({
        //       checkIns: ci,
        //     });
        //   }
        // });

        AsyncStorage.getItem('activityKey')
          .then(activityKey => {
            const { userId, checkIns } = this.state;
            const dateTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            if (checkIns.find((element) => element.activityKey === activityKey)) return;
            
            // https://www.youtube.com/watch?v=BWIN4JBm0-k&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=6
            // https://github.com/nathvarun/React-Native-Firebase-Tutorials/blob/master/Project%20Files/4%265%20Swipeable%20Lists/Complete/App.js
            var key = firebase.database().ref('CheckIns').push().key;
            var set = firebase.database().ref('CheckIns').child(key)
              .set({ activityKey, userId, dateTime, activityName: '', _key: key });

            set.then(data => {
              
            });
          });
      }),
    ];
  }
  render() {
    const { checkIns } = this.state;

    return (
      <Container style={styles.container}>
        <Content>
          <List
            dataArray={checkIns}
            renderRow={data => {
              const { activityKey, activityName, dateTime } = data;
              console.log(activityName);
              return <ListItem
                button
              >
                <Left>
                  <Text>
                    {`${dateTime}, ${activityName}, ${activityKey}`}
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

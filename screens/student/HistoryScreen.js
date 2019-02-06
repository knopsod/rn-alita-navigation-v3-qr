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
  Icon,
  Thumbnail,
  Body
} from "native-base";
import moment from 'moment';
import firebase from '../../Firebase'

export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      activityKey: '',
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

        this.child.on('child_changed', snapshot => {
          const data = snapshot.val();
          const { checkIns } = this.state;

          const filled = checkIns.filter(element => element._key !== data._key);
          filled.unshift(data);

          this.setState({
            checkIns: filled,
          });
        });

      });
  }
  componentDidMount() {
    const { navigation } = this.props;

    // https://stackoverflow.com/questions/50290818/react-navigation-detect-when-screen-tabbar-is-activated-appear-focus-blu
    this.subs = [
      
      navigation.addListener('didFocus', (payload) => {

        AsyncStorage.getItem('scanned')
          .then(scanned => {

            console.log(`scanned: ${scanned}`);
            if (scanned !== 'scanned') return;

            AsyncStorage.getItem('activityKey')
              .then(activityKey => {
                if (this.state.activityKey === activityKey) return;
  
                this.setState({ activityKey });
  
                console.log(`userId: ${this.state.userId}, activityKey: ${this.state.activityKey}`);
  
                firebase.database().ref('Activities/' + activityKey).once('value', actSnapshot => {
                  const activityName = actSnapshot.val().name;
                  const dateTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
                  const { userId } = this.state;
  
                  // https://www.youtube.com/watch?v=BWIN4JBm0-k&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=6
                  // https://github.com/nathvarun/React-Native-Firebase-Tutorials/blob/master/Project%20Files/4%265%20Swipeable%20Lists/Complete/App.js
                  var key = firebase.database().ref('CheckIns').push().key;
                  var set = firebase.database().ref('CheckIns').child(key)
                    .set({ activityKey, activityName, userId, dateTime, uri: '', _key: key });
      
                  set.then(data => {
                    
                  });
                  
                });
                
              });

          });
        
      })

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
              const { activityName, dateTime, uri } = data;
              console.log(activityName);
              return <ListItem
                thumbnail
                onPress={() => this.props.navigation.navigate('SelfyScreen', data)}
              >
                <Left>
                  <Thumbnail square source={{ uri }} />
                </Left>
                <Body>
                  <Text>{`${dateTime}`}</Text>
                  <Text note numberOfLines={1}>{`${activityName}`}</Text>
                </Body>
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

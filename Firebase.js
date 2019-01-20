import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB48Ze4yqncFaoOeAK6jKp_5QIyAl2dsTI",
  authDomain: "qrscanarisa.firebaseapp.com",
  databaseURL: "https://qrscanarisa.firebaseio.com",
  projectId: "qrscanarisa",
  storageBucket: "qrscanarisa.appspot.com",
  messagingSenderId: "989689218400"
};
firebase.initializeApp(config);

export default firebase;
import React, { Component } from "react";
import * as firebase from "firebase";
import "./App.css";
import RoomList from "./components/RoomList";
import MessageList from './components/MessageList';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUcxyr74E4wZN6wbZG1FVtitTeFZy1Lnk",
    authDomain: "bloc-chat-react-9fc72.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-9fc72.firebaseio.com",
    projectId: "bloc-chat-react-9fc72",
    storageBucket: "bloc-chat-react-9fc72.appspot.com",
    messagingSenderId: "444940832682"
  };
  firebase.initializeApp(config);

  class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        activeRoom: ""
      };
    }

    parentDataReference = (room) => {
      this.setState({ activeRoom: room });
    }
    render() {
      return (
        <div className="App">
          <header>
        snap,crackle,pop
           </header>
          <main>
          <RoomList firebase={firebase}
          getRoom={this.parentDataReference}
          activeRoom={this.state.activeRoom}
        />
          <MessageList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
        />
          </main>
        </div>
      );
    }
  }

  export default App;

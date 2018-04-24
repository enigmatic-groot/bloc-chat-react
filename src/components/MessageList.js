import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      // newMessage: "",
      newMessage: { username: "", content: "", sentAt: "", roomID: "" },

    };
    this.messagesRef = this.props.firebase.database().ref("messages");
 
  }

  componentDidMount() {
        this.messagesRef.on('child_added', snapshot  => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) })
            console.log(message);
            /*if (this.state.rooms.length === 1) { this.props.setRoom(room) }*/
          });
          this.messagesRef.on('child_removed', snapshot  => {
            this.setState({ messages: this.state.messages.filter( message => message.key !== snapshot.key )  })
            console.log({ messages: this.state.messages.filter( message => message.key !== snapshot.key )  })
          });


    }
    render() {
          return (
              <section className="messageList">
                  <h3>Message List</h3>

                  <ul>
                      {this.state.messages.filter( message => message.roomID === this.props.activeRoom.key ).map((message, index) =>
                      <div id={index} key={index}>
                          <h3>{message.username}</h3>
                          <p>{message.content}</p>
                       </div>

                      )
                      }
                  </ul>
              </section>
          );
      }
  }

  export default MessageList;

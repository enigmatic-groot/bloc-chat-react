import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: { username: "", content: "", sentAt: "", roomID: "" },
      newMessageText: ""
    };
    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
      console.log(message);
      /*if (this.state.rooms.length === 1) { this.props.setRoom(room) }*/
    });
    this.messagesRef.on("child_removed", snapshot => {
      this.setState({
        messages: this.state.messages.filter(
          message => message.key !== snapshot.key
        )
      });
      console.log({
        messages: this.state.messages.filter(
          message => message.key !== snapshot.key
        )
      });
    });
  }
  createMessages(n) {
    n.preventDefault();
    console.log(n);
    this.messagesRef.push({
      content: this.state.newMessageText,
      roomID: this.props.activeRoom.key,
      username: this.props.user.displayName
    });
  }
  handleChange(n) {
    //change the value in state in order for it to update in the UI
    //set state to the target element - the input
    this.setState({ newMessageText: n.target.value });
  }
  render() {
    return (
      <section className="messageList">
        <h3>Message List</h3>

        <ul>
          {this.state.messages
            .filter(message => message.roomID === this.props.activeRoom.key)
            .map((message, index) => (
              <div key={index}>
                <h3>{message.username}</h3>
                <p>{message.content}</p>
              </div>
            ))}
        </ul>
        {this.props.activeRoom.name === undefined ? (
          <p id="specifyShadow">
            Please specify a chat room to send your message{" "}
          </p>
        ) : (
          <form onSubmit={n => this.createMessages(n)}>
            <input
              type="text"
              value={this.state.newMessageText}
              onChange={n => this.handleChange(n)}
            />
            <input type="submit" />
          </form>
        )}
      </section>
    );
  }
}

export default MessageList;
